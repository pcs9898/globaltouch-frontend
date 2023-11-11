import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  Image,
  Progress,
  Show,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { CalculatePercentage } from "@/src/commons/utils/calculatePercentage";
import StickyBox from "react-sticky-box";
import { useAmountToFormatCurrency } from "@/src/components/customhooks/useAmountToFormatCurrency";
import { IProject } from "@/src/commons/types/generated/types";
import CustomSkeleton from "@/src/components/molecules/customSkeleton";
import { useTranslation } from "next-i18next";
import CreateUpdatedProjectModalContainer from "@/src/components/pages/createUpdatedProjectModal/createUpdatedProjectModal.container";
import { useRecoilValue } from "recoil";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import { useRouter } from "next/router";
import CreateDonationModalContainer from "@/src/components/pages/createDonationModal/createDonationModal.container";
import { useHandleShareBtnClick } from "@/src/components/customhooks/useHandleShareBtnClick";

interface IAsideCardProps {
  project: IProject;
  projectLoading: boolean;
}

export default function AsideCard({
  project,
  projectLoading,
}: IAsideCardProps) {
  const formattedAmount = useAmountToFormatCurrency({
    amount: project?.amount_raised ?? 0,
  });
  const formattedAmountGoal = useAmountToFormatCurrency({
    amount: Number(project?.amount_required) ?? 0,
  });
  const { t } = useTranslation();
  const loggedInUser = useRecoilValue(userState);
  const router = useRouter();
  const toast = useToast();
  const handleShareBtnClick = useHandleShareBtnClick();

  return (
    <Show above="md">
      <StickyBox style={{ width: "30%" }}>
        <Flex
          h="calc(500vh- 2.5px)"
          id="asideCard"
          position="sticky"
          pt="2.5px"
          pr="2.5px"
          pl="2.5px"
        >
          <Card
            w="100%"
            h="min-content"
            p="1.5rem"
            position="sticky"
            top="0px"
            float="right"
          >
            {projectLoading ? (
              <CustomSkeleton skeletonType="projectDetailAsideCard" />
            ) : (
              <Flex flexDir="column" gap="0.625rem" w="100%">
                <Flex gap="0.5rem">
                  <Flex gap="0.5rem" flexDir={{ base: "column", xl: "row" }}>
                    <Text fontWeight="semibold" fontSize="1.5rem">
                      {formattedAmount}
                    </Text>
                    <Flex
                      gap="0.25rem"
                      alignItems="flex-end"
                      color="gray"
                      fontWeight="medium"
                    >
                      {t("asideDonationCardTitle1") + " " + t("currency") + " "}
                      {formattedAmountGoal}
                      {" " + t("asideDonationCardTitle2")}
                    </Flex>
                  </Flex>
                </Flex>
                <Progress
                  width="100%"
                  value={CalculatePercentage({
                    numerator: project?.amount_raised,
                    denominator: project?.amount_required,
                  })}
                />
                <Flex alignItems="flex-end" gap="0.25rem">
                  <Text fontSize="1.25rem" fontWeight="bold">
                    {project?.donation_count}
                  </Text>
                  <Text fontWeight="medium" fontSize="1rem" color="gray">
                    {t("asideDonationCardDonations")}
                  </Text>
                </Flex>
                <Flex flexDir="column" gap="0.5rem">
                  <Button
                    colorScheme="gray"
                    w="100%"
                    onClick={handleShareBtnClick}
                  >
                    {t("asideDonationCardShareBtn")}
                  </Button>
                  {loggedInUser?.user_id === project?.user?.user_id ? (
                    <CreateUpdatedProjectModalContainer isMd={true} />
                  ) : !loggedInUser ? (
                    <Button
                      onClick={() => {
                        toast({
                          status: "info",
                          title: "Should sign in first",
                        });
                        router.push("/signIn");
                      }}
                    >
                      {t("asideDonationCardDonateBtn")}
                    </Button>
                  ) : (
                    <CreateDonationModalContainer
                      project_title={project?.title}
                      project_user_name={project?.user?.name}
                      project_id={project?.project_id}
                      isMd={true}
                    />
                  )}
                </Flex>
              </Flex>
            )}
          </Card>
        </Flex>
      </StickyBox>
    </Show>
  );
}
