import {
  IMutation,
  IMutationCreateProjectDonationForMobileArgs,
} from "@/src/commons/types/generated/types";
import { gql, useMutation } from "@apollo/client";
import { Box, Center, Flex, Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookie from "js-cookie";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "@/src/commons/libraries/recoil/auth.recoil";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getAccessToken } from "@/src/commons/libraries/apollo/getAccessToken";

export const CREATE_PROJECT_DONATION_FOR_MOBILE = gql`
  mutation createProjectDonationForMobile(
    $createProjectDonationForMobileDTO: CreateProjectDonationForMobileDTO!
  ) {
    createProjectDonationForMobile(
      createProjectDonationForMobileDTO: $createProjectDonationForMobileDTO
    ) {
      success
    }
  }
`;

export default function PaymentCompletePage({ query }) {
  const router = useRouter();
  const toast = useToast();
  const restoreAccessToken = useRecoilValueLoadable(restoreAccessTokenLoadable);

  const [createDonationForMobileMutation] = useMutation<
    Pick<IMutation, "createProjectDonationForMobile">,
    IMutationCreateProjectDonationForMobileArgs
  >(CREATE_PROJECT_DONATION_FOR_MOBILE);

  useEffect(() => {
    const project_id = query.merchant_uid.slice(0, -4);

    if (query.error_msg) {
      toast({
        status: "error",
        title: query.error_msg,
      });
      router.push(`/project/${project_id}`);
    } else {
      try {
        const asyncMutation = async () => {
          const accessToken = await getAccessToken();

          const result = await createDonationForMobileMutation({
            variables: {
              createProjectDonationForMobileDTO: {
                imp_uid: query.imp_uid,
                project_id,
              },
            },
            context: {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          });

          if (result.data.createProjectDonationForMobile.success === true) {
            toast({
              status: "success",
              title: "Thanks for your donation",
            });
            router.push(`/project/${project_id}`);
          } else {
            throw new Error("Failed to donation, try again plz");
          }
        };

        asyncMutation();
      } catch (error) {
        toast({
          status: "success",
          title: error.message,
        });
        console.log(error);
        // router.push(`/project/${project_id}`);
      }
    }
  }, []);

  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Spinner size="xl" colorScheme="teal" />
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
}
