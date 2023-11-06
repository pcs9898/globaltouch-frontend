import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spinner,
  useBreakpointValue,
  useDisclosure,
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
import { ArrowBackIosNew } from "@mui/icons-material";
import FooterForStatic from "../../organisms/footerForStatic";
import Head from "next/head";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const scrollBehavior = useBreakpointValue({ base: "outside", md: "inside" });

  return (
    <>
      <Head>
        <title>{`My profile`}</title>
      </Head>
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
                  <Profile onClickEditProfileBtn={true} />
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
                  endMessage={
                    <EndMessage endMessageOptions="donationHistory" />
                  }
                  scrollableTarget="scrollableDiv"
                >
                  <Box
                    display={{
                      base: "flex",
                      md: donations?.length === 0 ? "flex" : "grid",
                    }}
                    flexDirection={{ base: "column", md: "initial" }}
                    gridTemplateColumns={{
                      base: "initial",
                      md: "repeat(2, 1fr)",
                    }}
                    gap="1rem"
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
                        w="100%"
                        h="calc(100vh - 20rem)"
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
                    display={{
                      base: "flex",
                      md: projects?.length === 0 ? "flex" : "grid",
                    }}
                    flexDirection={{ base: "column", md: "initial" }}
                    gridTemplateColumns={{
                      base: "initial",
                      md: "repeat(2, 1fr)",
                    }}
                    gap="1rem"
                  >
                    {projectLoading ? (
                      Array.from({ length: 8 }, (_, i) => (
                        <CustomSkeleton key={i} skeletonType="projectCard" />
                      ))
                    ) : projects?.length > 0 ? (
                      projects?.map((project) => (
                        <CustomCard
                          key={project.project_id}
                          project={project}
                        />
                      ))
                    ) : (
                      <Flex
                        w="100%"
                        h="calc(100vh - 20rem)"
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
    </>
  );
}
