import { useState } from "react";
import CreateDonationModalPresenter from "../../templates/createDonationModal/createDonationModal.presenter";
import {
  RequestPayParams,
  RequestPayResponse,
} from "@/src/commons/libraries/portone/portone";
import { useTranslation } from "next-i18next";
import { useToast } from "@chakra-ui/react";
import uuid from "react-uuid";
import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateProjectDonationArgs,
} from "@/src/commons/types/generated/types";

interface ICreateDonationModalContainerProps {
  project_title: string;
  project_user_name: string;
  project_id: string;
  isMd: boolean;
}

export const CREATE_PROJECT_DONATION = gql`
  mutation createProjectDonation(
    $createProjectDonationDTO: CreateProjectDonationDTO!
  ) {
    createProjectDonation(createProjectDonationDTO: $createProjectDonationDTO) {
      projectDonation_id
      amount
      created_at
      project {
        project_id
        title
        cityName
        countryCode {
          country_code
        }
        projectImages {
          image_url
          image_index
        }
      }
    }
  }
`;

export default function CreateDonationModalContainer({
  project_title,
  project_user_name,
  project_id,
  isMd,
}: ICreateDonationModalContainerProps) {
  const [amount, setAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [closeModalBoolean, setCloseModalBoolean] = useState(false);
  const { t } = useTranslation();
  const toast = useToast();

  const [createDonationMutation] = useMutation<
    Pick<IMutation, "createProjectDonation">,
    IMutationCreateProjectDonationArgs
  >(CREATE_PROJECT_DONATION);

  const onChangeAmount = (e) => {
    const value = e.target.value;
    if (value === "") {
      setAmount(null);
    } else if (value <= 0) {
      setAmount(null);
    } else {
      setAmount(e.target.value);
    }
  };

  const onClickSubmit = () => {
    setIsLoading(true);
    if (!window.IMP) return;

    const { IMP } = window;
    IMP.init(process.env.NEXT_PUBLIC_PORTONE_IMP_CODE);

    const merchant_uid = `${project_id}_${uuid()}`;

    const data: RequestPayParams = {
      pg: "kakaopay",
      pay_method: "card",
      merchant_uid,
      amount: amount,
      name: project_id,
      m_redirect_url: process.env.NEXT_PUBLIC_PORTONE_M_REDIRECT_URL,
    };

    IMP.request_pay(data, callback);

    async function callback(response: RequestPayResponse) {
      const { success, error_msg } = response;

      if (success) {
        try {
          const result = await createDonationMutation({
            variables: {
              createProjectDonationDTO: {
                amount: response.paid_amount,
                imp_uid: response.imp_uid,
                project_id,
              },
            },
            update(cache, { data }) {
              const newDonation = data?.createProjectDonation;

              cache.modify({
                fields: {
                  fetchUserDonatedNCommented: (prev, { readField }) => {
                    if (prev.commented === true) return prev;
                    return { commented: false, donated: true };
                  },
                },
              });
              cache.modify({
                fields: {
                  fetchProject: (prev, { readField }) => {
                    return {
                      ...prev,
                      amount_raised:
                        Number(prev.amount_raised) + Number(amount),
                      donation_count: (prev.donation_count += 1),
                    };
                  },
                },
              });
              cache.modify({
                fields: {
                  fetchUserLoggedInDonations: (prev, { readField }) => {
                    return [newDonation, ...prev];
                  },
                },
              });
            },
          });
          if (result.data.createProjectDonation) {
            toast({
              status: "success",
              title: `Thanks so much your support, ${t(
                "createDonationModalText2"
              )}, ${project_user_name}`,
            });
            setAmount(null);
            setTimeout(() => {
              setIsLoading(false);
            }, 100);

            setCloseModalBoolean(true);

            setTimeout(() => {
              setCloseModalBoolean(false);
            }, 100);
          }
        } catch (error) {
          toast({
            status: "error",
            title: error.message,
          });
          setCloseModalBoolean(true);
          setIsLoading(false);

          setTimeout(() => {
            setCloseModalBoolean(false);
          }, 100);
        }
      } else {
        toast({
          status: "error",
          title: error_msg,
        });
        setCloseModalBoolean(true);
        setIsLoading(false);

        setTimeout(() => {
          setCloseModalBoolean(false);
        }, 100);
      }
    }
  };

  return (
    <CreateDonationModalPresenter
      customModalUIProps={{ project_title, project_user_name }}
      customModalLogicProps={{
        amount,
        closeModalBoolean,
        isLoading,
        onChangeAmount,
        onClickSubmit,
        isMd,
      }}
    />
  );
}
