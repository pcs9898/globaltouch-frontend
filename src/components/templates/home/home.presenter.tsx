import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  IconButton,
  Show,
  Spinner,
  Text,
} from "@chakra-ui/react";
import CardList from "../../organisms/cardList";
import { IProject } from "@/src/commons/types/generated/types";
import CustomTab from "../../molecules/customTab";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import GoogleMap from "../../molecules/googleMap";
import InfiniteScroll from "react-infinite-scroll-component";
import EndMessage from "../../molecules/infiniteScroll/endMessage";
import CustomSkeleton from "../../molecules/customSkeleton";
import CustomCard from "../../molecules/customCard";
import { useCountryCodeToLocaleCountryName } from "../../customhooks/useCountryCodeToLocaleCountryName";
import { useTranslation } from "next-i18next";
import ReactCountryFlag from "react-country-flag";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ArrowBackIos } from "@mui/icons-material";
import { useRef } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import Sheet from "react-modal-sheet";
import styled from "@emotion/styled";

export interface IHomePresenterProps {
  cardListProps?: {
    onClickTab?: (tab: string) => void;
    loading?: boolean;
    projects?: IProject[];
    fetchMore?: () => any;
    hasMore?: boolean;
    scrollRef?: MutableRefObject<any>;
    scrollRefMobile?: MutableRefObject<any>;
  };
  cardListByCountryProps?: {
    loadingByCountry: boolean;
    projectsByCountry: IProject[];
    fetchMoreByCountry?: () => any;
    hasMoreByCountry?: boolean;
    scrollRefProjectsByCountry?: MutableRefObject<any>;
    selectedCountryCode: string;
    setShowProjectsList: Dispatch<SetStateAction<boolean>>;
    scrollRefProjectsByCountryMobile?: MutableRefObject<any>;
  };
  mapProps?: {
    onClickCountryFlagMarker: (string) => Promise<IProject[]>;
  };
  showProjectsList: boolean;
  onClickArrowBack?: any;
}

interface ICountriesArray {
  country_code: string;
  korName: string;
  engName: string;
  lat: number;
  lng: number;
}

const CustomBackDrop = styled(Sheet.Backdrop)`
  .react-modal-sheet-backdrop {
    display: "none";
    background-color: rgba(0, 0, 0, 0);
  }
`;

export default function HomePresenter({
  cardListProps: {
    onClickTab,
    projects,
    loading,
    fetchMore,
    hasMore,
    scrollRef,
    scrollRefMobile,
  },
  cardListByCountryProps: {
    loadingByCountry,
    projectsByCountry,
    fetchMoreByCountry,
    hasMoreByCountry,
    scrollRefProjectsByCountry,
    selectedCountryCode,
    setShowProjectsList,
    scrollRefProjectsByCountryMobile,
  },
  mapProps: { onClickCountryFlagMarker },
  showProjectsList,
  onClickArrowBack,
}: IHomePresenterProps) {
  const countryName = useCountryCodeToLocaleCountryName({
    country_code: selectedCountryCode,
  });
  const { t } = useTranslation();
  const { locale, replace } = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <Flex
      w="100vw"
      h={{ base: "calc(100vh - 3.5rem)", md: "calc(100vh - 5rem)" }}
      flexDir={{ base: "column", md: "row" }}
    >
      <Show above="md">
        <Box
          id="cardList"
          w="50%"
          shadow="base"
          borderRadius="0px"
          px="1rem"
          zIndex={1}
        >
          {showProjectsList ? (
            <CardList
              customTabProps={{
                onClickTab,
                categoryKindOption: "projectListCategory",
              }}
              cardListProps={{
                projects,
                loading,
                fetchMore,
                hasMore,
                scrollRef,
              }}
            />
          ) : (
            <Flex flexDir="column" w="100%">
              <Box
                position="fixed"
                top={{ md: "5rem" }}
                left="0px"
                zIndex={1}
                p="1rem"
                width="50%"
                borderRadius="0"
                backgroundColor="white"
              >
                <Flex
                  w="100%"
                  h="100%"
                  // justifyContent="center"
                  fontSize="1.25rem"
                  fontWeight="Bold"
                  alignItems="center"
                  gap="0.5rem"
                  position="relative"
                >
                  <IconButton
                    aria-label="arrowBack"
                    // marginRight="auto"
                    onClick={() => {
                      replace("/", `/`, { shallow: true });

                      setShowProjectsList(true);
                    }}
                    zIndex={1}
                    variant="unstyled"
                    colorScheme="gray"
                    icon={<ArrowBackIos />}
                  />
                  <Flex
                    gap="0.5rem"
                    textAlign="center"
                    position="absolute"
                    left="0"
                    right="0"
                    justifyContent="center" // 추가된 코드
                    alignItems="center" // 추가된 코드
                  >
                    <ReactCountryFlag
                      countryCode={selectedCountryCode}
                      className="emojiFlag"
                      // svg
                      // style={{
                      //   width: "2rem",
                      //   height: "2rem",
                      // }}
                      style={{
                        fontSize: "2rem",
                      }}
                    />

                    {countryName + t("countryDetailCardListHeaderText")}
                  </Flex>
                </Flex>
              </Box>

              <Box
                mt="4.5rem"
                w="100%"
                h="calc(100vh - 8.5rem)"
                overflow="auto"
                id="scrollableDiv"
                ref={scrollRefProjectsByCountry}
              >
                <InfiniteScroll
                  dataLength={projectsByCountry?.length ?? 0}
                  next={fetchMoreByCountry}
                  hasMore={hasMoreByCountry}
                  loader={loadingByCountry && <Spinner />}
                  endMessage={<EndMessage endMessageOptions="project" />}
                  scrollableTarget="scrollableDiv"
                >
                  <Box
                    display={{ base: "flex", lg: "grid" }}
                    gridTemplateColumns={{ lg: "repeat(2, 1fr)" }}
                    gap="1rem"
                    flexDirection="column"
                  >
                    {loadingByCountry ? (
                      Array.from({ length: 8 }, (_, i) => (
                        <CustomSkeleton key={i} skeletonType="projectCard" />
                      ))
                    ) : projectsByCountry.length > 0 ? (
                      projectsByCountry?.map((project) => (
                        <CustomCard
                          key={project.project_id}
                          project={project}
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
                        {locale === "en"
                          ? t("countryDetailCardListNoMoreText") + countryName
                          : countryName + t("countryDetailCardListNoMoreText")}
                      </Flex>
                    )}
                  </Box>
                </InfiniteScroll>
              </Box>
            </Flex>
          )}
        </Box>
      </Show>
      <Box
        id="map"
        w={{ base: "100%", md: "50%" }}
        h={{ base: "45%", md: "100%" }}
        borderRadius="0px"
      >
        <GoogleMap
          onClickCountryFlagMarker={onClickCountryFlagMarker}
          showProjectsList={showProjectsList}
        />
      </Box>
      <Show below="md">
        <Card w="100%" h="55%" shadow="dark-lg" borderRadius="0px">
          <Box pt="1rem">
            {showProjectsList ? (
              <CustomTab
                categoryKindOption="projectListCategory"
                onClickTab={onClickTab}
              />
            ) : (
              <Flex
                w="100%"
                // fontSize="1.25rem"
                fontWeight="Bold"
                alignItems="center"
                gap="0.5rem"
                position="relative"
                ml="0.5rem"
              >
                <IconButton
                  aria-label="arrowBack"
                  // marginRight="auto"
                  onClick={onClickArrowBack}
                  zIndex={1}
                  variant="unstyled"
                  colorScheme="gray"
                  icon={<ArrowBackIos />}
                />
                <Flex
                  gap="0.5rem"
                  position="absolute"
                  top="50%" // centering in view
                  left="50%" // centering in view
                  transform="translate(-50%, -50%)" // centering in view
                  zIndex="1"
                  fontSize="1rem"
                  w="max-content"
                  alignItems="center"
                >
                  <ReactCountryFlag
                    countryCode={selectedCountryCode}
                    className="emojiFlag"
                    // svg
                    // style={{
                    //   width: "2rem",
                    //   height: "2rem",
                    // }}
                    style={{
                      fontSize: "2rem",
                    }}
                  />

                  {countryName + t("countryDetailCardListHeaderText")}
                </Flex>
              </Flex>
            )}
          </Box>
          {/* </Sheet.Header>
                <Sheet.Content> */}
          {showProjectsList ? (
            <>
              <Box
                mt="1rem"
                w="100%"
                overflow="auto"
                id="scrollableDiv"
                ref={scrollRefMobile}
                px="1rem"
              >
                <InfiniteScroll
                  dataLength={projects?.length ?? 0}
                  next={fetchMore}
                  hasMore={hasMore}
                  loader={<Spinner />}
                  endMessage={<EndMessage endMessageOptions="project" />}
                  scrollableTarget="scrollableDiv"
                >
                  <Box
                    display={{ base: "flex", xl: "grid" }}
                    gridTemplateColumns={{ xl: "repeat(2, 1fr)" }}
                    gap="1rem"
                    flexDirection="column"
                  >
                    {loading
                      ? Array.from({ length: 8 }, (_, i) => (
                          <CustomSkeleton key={i} skeletonType="projectCard" />
                        ))
                      : projects?.map((project) => (
                          <CustomCard
                            key={project.project_id}
                            project={project}
                          />
                        ))}
                  </Box>
                </InfiniteScroll>
              </Box>
            </>
          ) : (
            <Box
              mt="1rem"
              w="100%"
              overflow="auto"
              id="scrollableDiv2"
              ref={scrollRefProjectsByCountryMobile}
              px="1rem"
            >
              <InfiniteScroll
                dataLength={projectsByCountry?.length ?? 0}
                next={fetchMoreByCountry}
                hasMore={hasMoreByCountry}
                loader={loadingByCountry && <Spinner />}
                endMessage={<EndMessage endMessageOptions="project" />}
                scrollableTarget="scrollableDiv2"
              >
                <Box
                  display={{ base: "flex", lg: "grid" }}
                  gridTemplateColumns={{ lg: "repeat(2, 1fr)" }}
                  gap="1rem"
                  flexDirection="column"
                >
                  {loadingByCountry ? (
                    Array.from({ length: 8 }, (_, i) => (
                      <CustomSkeleton key={i} skeletonType="projectCard" />
                    ))
                  ) : projectsByCountry.length > 0 ? (
                    projectsByCountry?.map((project) => (
                      <CustomCard key={project.project_id} project={project} />
                    ))
                  ) : (
                    <Flex
                      w="100%"
                      h="100%"
                      position="absolute"
                      justifyContent="center"
                      alignItems="center"
                      fontSize="1.25rem"
                      fontWeight="semibold"
                      color="gray"
                    >
                      {locale === "en"
                        ? t("countryDetailCardListNoMoreText") + countryName
                        : countryName + t("countryDetailCardListNoMoreText")}
                    </Flex>
                  )}
                </Box>
              </InfiniteScroll>
            </Box>
          )}
        </Card>
      </Show>
    </Flex>
  );
}
