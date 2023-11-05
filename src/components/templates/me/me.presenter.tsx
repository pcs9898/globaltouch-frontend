import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import StickyBox from "react-sticky-box";
import Profile from "../../molecules/profile";
import CustomTab from "../../molecules/customTab";
import { MutableRefObject } from "react";
import {
  IProject,
  IProjectDonation,
} from "@/src/commons/types/generated/types";
import InfiniteScroll from "react-infinite-scroll-component";
import EndMessage from "../../molecules/infiniteScroll/endMessage";
import CustomSkeleton from "../../molecules/customSkeleton";
import CustomCard from "../../molecules/customCard";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import { useRecoilValue } from "recoil";
import CustomModal from "../../organisms/customModal";

interface IMePresenterProps {
  onClickTab: (tab: string) => void;
  scrollRef: MutableRefObject<any>;
  buttonRef: MutableRefObject<any>;
  onClickOpenEditProfileModal: () => void;
  selectedTab: string;
  donationProps?: {
    donations: IProjectDonation[];
    donationLoading: boolean;
    donationHasMore: boolean;
    donationFetchMore: () => void;
  };
  projectProps?: {
    projects: IProject[];
    projectLoading: boolean;
    projectHasMore: boolean;
    projectFetchMore: () => void;
  };
}

export default function MePresenter({
  selectedTab,
  onClickTab,
  scrollRef,
  buttonRef,
  onClickOpenEditProfileModal,
  donationProps: {
    donations,
    donationLoading,
    donationFetchMore,
    donationHasMore,
  },
  projectProps: { projectFetchMore, projectHasMore, projectLoading, projects },
}: IMePresenterProps) {
  const { t } = useTranslation();
  const user = useRecoilValue(userState);

  return (
    <Box
      w="100%"
      flexDir="row"
      h={{ base: "calc(100vh - 3.5rem)", md: "calc(100vh - 5rem)" }}
      overflow="auto"
      id="scrollableDiv"
      ref={scrollRef}
    >
      <Center>
        <Flex w="100%" flexDir="column" maxW="container.md">
          <StickyBox
            style={{
              width: "100%",
              zIndex: 1,
              backgroundColor: "white",
              paddingBottom: "1rem",
              paddingTop: "1rem",
              borderRadius: "0px",
            }}
          >
            <Flex flexDir="column" gap="1rem" id="11231" w="100%">
              <Heading fontSize={{ base: "1.75rem", md: "2.5rem" }}>
                {t("topProfileHeaderTitle")}
              </Heading>
              {!user ? (
                <CustomSkeleton skeletonType="profile" />
              ) : (
                <>
                  <Profile
                    onClickEditProfileBtn={onClickOpenEditProfileModal}
                  />
                  <CustomModal modalHeaderTxt=""></CustomModal>
                  <Button display="none" ref={buttonRef}>
                    edit profile
                  </Button>
                </>
              )}
              <CustomTab
                onClickTab={onClickTab}
                categoryKindOption="profileCategory"
              />
            </Flex>
          </StickyBox>
          <Box>
            {selectedTab === "Donation History" ? (
              <InfiniteScroll
                dataLength={donations?.length ?? 0}
                next={donationFetchMore}
                hasMore={donationHasMore}
                loader={donationLoading && <Spinner />}
                endMessage={<EndMessage endMessageOptions="donationHistory" />}
                scrollableTarget="scrollableDiv"
              >
                <Box
                  display={{ base: "flex", md: "grid" }}
                  flexDirection={{ base: "column", md: "initial" }}
                  gridTemplateColumns={{
                    base: "initial",
                    md: "repeat(2, 1fr)",
                  }}
                  gap="1rem"
                  flexDirection="column"
                >
                  {donationLoading ? (
                    Array.from({ length: 8 }, (_, i) => (
                      <CustomSkeleton key={i} skeletonType="projectCard" />
                    ))
                  ) : donations?.length > 0 ? (
                    donations?.map((donation) => (
                      <CustomCard
                        key={donation.projectDonation_id}
                        donation={donation}
                      />
                    ))
                  ) : (
                    <Flex
                      w="50%"
                      position="absolute"
                      h="calc(100vh - 8.5rem)"
                      justifyContent="center"
                      alignItems="center"
                      fontSize="1.25rem"
                      fontWeight="semibold"
                      color="gray"
                    >
                      Not found my donation History
                    </Flex>
                  )}
                </Box>
              </InfiniteScroll>
            ) : (
              <InfiniteScroll
                dataLength={projects?.length ?? 0}
                next={projectFetchMore}
                hasMore={projectHasMore}
                loader={projectLoading && <Spinner />}
                endMessage={<EndMessage endMessageOptions="project" />}
                scrollableTarget="scrollableDiv"
              >
                <Box
                  display={{ base: "flex", md: "grid" }}
                  flexDirection={{ base: "column", md: "initial" }}
                  gridTemplateColumns={{
                    base: "initial",
                    md: "repeat(2, 1fr)",
                  }}
                  gap="1rem"
                  flexDirection="column"
                >
                  {projectLoading ? (
                    Array.from({ length: 8 }, (_, i) => (
                      <CustomSkeleton key={i} skeletonType="projectCard" />
                    ))
                  ) : projects?.length > 0 ? (
                    projects?.map((project) => (
                      <CustomCard key={project.project_id} project={project} />
                    ))
                  ) : (
                    <Flex
                      w="50%"
                      position="absolute"
                      h="calc(100vh - 8.5rem)"
                      justifyContent="center"
                      alignItems="center"
                      fontSize="1.25rem"
                      fontWeight="semibold"
                      color="gray"
                    >
                      Not found my projects
                    </Flex>
                  )}
                </Box>
              </InfiniteScroll>
            )}
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}
