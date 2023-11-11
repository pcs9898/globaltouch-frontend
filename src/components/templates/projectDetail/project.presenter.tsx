import {
  IProject,
  IProjectComment,
  IUpdatedProject,
} from "@/src/commons/types/generated/types";
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
import { useCountryCodeToLocaleCountryName } from "../../customhooks/useCountryCodeToLocaleCountryName";
import { CalculatePercentage } from "@/src/commons/utils/calculatePercentage";
import { useAmountToFormatCurrency } from "../../customhooks/useAmountToFormatCurrency";
import { useFormatTimeAgo } from "../../customhooks/useFormatTimgAgo";
import { useTranslation } from "next-i18next";
import ClampLines from "react-clamp-lines";
import { loremIpsum } from "lorem-ipsum";
import TextTruncate from "react-text-truncate";
import LinesEllipsis from "react-lines-ellipsis";
import { useEffect, useState } from "react";
import ProjectUpdatesModalPresenter from "../projectUpdatesModal/projectUpdatesModal.presenter";
import { useRecoilValue } from "recoil";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import CreateUpdatedProjectModalContainer from "../../pages/createUpdatedProjectModal/createUpdatedProjectModal.container";
import CustomSkeleton from "../../molecules/customSkeleton";
import CreateDonationModalContainer from "../../pages/createDonationModal/createDonationModal.container";
import { useRouter } from "next/router";
import CommentInput from "./components/commentInput/commentInput";
import CommentList from "./components/commentList/commentList";
import StickyBox from "react-sticky-box";
import Head from "next/head";
import ReactCountryFlag from "react-country-flag";
import AsideCard from "./components/asideCard";
import { useHandleShareBtnClick } from "../../customhooks/useHandleShareBtnClick";

interface IProjectPresenter {
  projectProps: {
    project: IProject;
    projectLoading: boolean;
  };
  updatedProjectsProps?: {
    updatedProjects: IUpdatedProject[];
    updatedProjectsLoading: boolean;
  };
  commentsProps?: {
    isShowCommentInput: boolean;
    onClickCreateComment: (string) => void;
    onClickDeleteComment: (projectComment_id: string) => void;
    createCommentLoading: boolean;
    commentsData: IProjectComment[];
    fetchMoreComments: () => void;
    hasMoreComments: boolean;
    commentsLoading: boolean;
  };
}

export default function ProjectPresenter({
  projectProps: { project, projectLoading },
  updatedProjectsProps: { updatedProjects, updatedProjectsLoading },
  commentsProps: {
    isShowCommentInput,
    onClickCreateComment,
    createCommentLoading,
    commentsData,
    onClickDeleteComment,
    fetchMoreComments,
    hasMoreComments,
    commentsLoading,
  },
}: IProjectPresenter) {
  const { t } = useTranslation();
  const countryName = useCountryCodeToLocaleCountryName({
    country_code: project?.countryCode.country_code,
  });
  const formattedAmount = useAmountToFormatCurrency({
    amount: project?.amount_raised ?? 0,
  });
  const formattedAmountGoal = useAmountToFormatCurrency({
    amount: Number(project?.amount_required) ?? 0,
  });
  const formatCreatedAt = useFormatTimeAgo({ timestamp: project?.created_at });

  const formatCreatedAtForUpdatedProject = useFormatTimeAgo({
    timestamp: updatedProjects ? updatedProjects[0]?.created_at : 0,
  });
  const [isShowingFullText, setIsShowingFullText] = useState(false);
  const loggedInUser = useRecoilValue(userState);
  const router = useRouter();
  const toast = useToast();
  const [isSticky, setSticky] = useState(false);
  const handleShareBtnClick = useHandleShareBtnClick();

  const checkStickiness = () => setSticky(window.scrollY > 500); // 200을 원하는 스크롤 위치로 변경

  useEffect(() => {
    window.addEventListener("scroll", checkStickiness);

    return () => {
      window.removeEventListener("scroll", checkStickiness);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{project?.title}</title>
      </Head>
      <Flex
        w="100%"
        h={{ base: "calc(100vh - 8.5rem)", md: "calc(100vh - 5rem)" }}
        overflowY="auto"
        gap="1.25rem"
        pt={{ md: "1rem" }}
        borderRadius={{ base: "0px", md: "12px" }}
        id="scrollableDiv"
      >
        {/* projectDetail */}
        <Flex
          w={{ base: "100%", md: "70%" }}
          flexDir="column"
          px={{ md: "1rem", "71.875rem": "0px" }}
        >
          {projectLoading ? (
            <CustomSkeleton skeletonType="projectDetail" />
          ) : (
            <>
              <Image
                alt="project image"
                src={project?.projectImages[0]?.image_url}
                h="40vh"
                aspectRatio={16 / 9}
                objectFit="cover"
              />
              <Flex flexDir="column" px="0.75rem" gap="1rem" pt="0.5rem">
                {/* project */}
                <Flex gap="1rem" flexDir="column">
                  <Flex flexDirection="column">
                    <Heading fontSize="2rem" fontWeight="bold" pb="0.25rem">
                      {project?.title}
                    </Heading>
                    <Flex fontSize="1rem" fontWeight="medium" color="gray">
                      <ReactCountryFlag
                        countryCode={project?.countryCode.country_code}
                        className="emojiFlag"
                        style={{
                          fontSize: "1.5rem",
                          marginRight: "0.25rem",
                        }}
                      />
                      {` ${countryName}, ${project?.cityName}`} &bull;{" "}
                      {project?.projectCategory.project_category} &bull;{" "}
                      {formatCreatedAt}
                    </Flex>
                  </Flex>

                  <Flex flexDir="column" gap="0.25rem">
                    {project && (
                      <Progress
                        width="100%"
                        value={CalculatePercentage({
                          numerator: project?.amount_raised,
                          denominator: project?.amount_required,
                        })}
                      />
                    )}

                    <Flex gap="0.5rem" fontWeight="semibold" fontSize="1rem">
                      {formattedAmount && (
                        <Flex
                          gap="0.25rem"
                          fontSize="1.125rem"
                          alignItems="flex-end"
                        >
                          <Text fontWeight="semibold">{formattedAmount}</Text>
                          <Text
                            fontWeight="regular"
                            fontSize="1rem"
                            color="gray"
                          >
                            {t("projectCardRaised")}
                          </Text>
                        </Flex>
                      )}
                      <Text>&bull;</Text>
                      <Flex
                        gap="0.25rem"
                        fontSize="1.125rem"
                        alignItems="flex-end"
                      >
                        <Text fontSize="1.125rem" fontWeight="semibold">
                          {project?.donation_count}
                        </Text>
                        <Text fontWeight="regular" fontSize="1rem" color="gray">
                          {t("projectDetailDonations")}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>

                <Divider />

                {/* organizer */}
                <Flex flexDir="column" gap="1.5rem">
                  <Heading fontSize="1.5rem" fontWeight="bold">
                    {t("projectDetailOrganizer")}
                  </Heading>
                  <Flex gap="0.5rem" px="0.75rem">
                    <Avatar
                      src={project?.user.profile_image_url}
                      name={project?.user.name}
                      w="1.75rem"
                      h="1.75rem"
                    />
                    <Flex alignItems="center" gap="0.5rem">
                      <Text fontSize="1rem" fontWeight="semibold">
                        {project?.user.name}
                      </Text>
                      <Text>&bull;</Text>
                      <Text fontSize="0.875rem" color="gray">
                        {" "}
                        {countryName + ", " + project?.cityName}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Divider />
                {/* story */}
                <Flex flexDir="column" gap="1.5rem">
                  <Heading fontSize="1.5rem" fontWeight="bold">
                    {t("projectDetailStory")}
                  </Heading>

                  <Box px="0.75rem">
                    <Box
                      noOfLines={isShowingFullText ? null : 10}
                      fontSize="1rem"
                      fontWeight="regular"
                    >
                      {project?.content}
                    </Box>
                    {!isShowingFullText && project?.content.length > 500 && (
                      <Text
                        mt="0.5rem"
                        decoration="underline"
                        onClick={() => setIsShowingFullText(true)}
                        cursor="pointer"
                        fontSize="1rem"
                        fontWeight="semibold"
                      >
                        {t("projectDetailReadMore")}
                      </Text>
                    )}
                  </Box>
                </Flex>

                {updatedProjects?.length > 0 && <Divider />}

                {/* Updates */}

                {updatedProjects?.length > 0 && (
                  <Flex flexDir="column" gap="1.5rem">
                    <Heading fontSize="1.5rem" fontWeight="bold">
                      {t("updatedProjectHeader")}({updatedProjects?.length})
                    </Heading>

                    <Flex px="0.75rem" gap="8px" flexDir="column">
                      <Flex gap="0.5rem">
                        <Text fontSize="1rem" fontWeight="bold" color="black">
                          {formatCreatedAtForUpdatedProject}
                        </Text>
                        <Text fontSize="1rem" fontWeight="medium" color="gray">
                          by {project.user.name}
                        </Text>
                      </Flex>
                      <Box fontSize="1rem" fontWeight="regular">
                        {updatedProjects[0].content}
                        <ProjectUpdatesModalPresenter
                          updatedProjects={updatedProjects}
                        />
                      </Box>
                    </Flex>
                  </Flex>
                )}

                {/* projectComment */}
                <Divider />
                <Flex flexDir="column" gap="1.5rem">
                  <Flex flexDir="column" gap="0.5rem">
                    <Heading fontSize="1.5rem" fontWeight="bold">
                      {t("projectCommentHeader")}
                    </Heading>
                    <Text fontWeight="bold" color="gray">
                      {t("projectCommentSubText")}
                    </Text>
                  </Flex>
                  {/* commentInput n commentList */}
                  <Flex px="0.75rem" flexDir="column" gap="1rem">
                    {isShowCommentInput && (
                      <CommentInput
                        onClickCreateComment={onClickCreateComment}
                        createCommentLoading={createCommentLoading}
                      />
                    )}
                    {commentsData && (
                      <CommentList
                        comments={commentsData}
                        onClickDeleteComment={onClickDeleteComment}
                        fetchMoreComments={fetchMoreComments}
                        hasMoreComments={hasMoreComments}
                        commentsLoading={commentsLoading}
                      />
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </>
          )}
          <Show below="md">
            <Flex
              w="100vw"
              h="5rem"
              position="fixed"
              bottom="0px"
              left="0px"
              p="1rem"
              gap="0.5rem"
              zIndex={12}
              bgColor="white"
              shadow="2xl"
            >
              <Button h="100%" colorScheme="gray" onClick={handleShareBtnClick}>
                {t("asideDonationCardShareBtn")}
              </Button>
              {loggedInUser?.user_id === project?.user?.user_id ? (
                <CreateUpdatedProjectModalContainer isMd={false} />
              ) : !loggedInUser ? (
                <Button
                  w="100%"
                  h="100%"
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
                  isMd={false}
                />
              )}
            </Flex>
          </Show>
        </Flex>

        {/* project aside Card */}

        <AsideCard project={project} projectLoading={projectLoading} />
      </Flex>
    </>
  );
}
