import { Box, Flex, IconButton, Show, Spinner, Text } from "@chakra-ui/react";
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

export interface IHomePresenterProps {
  cardListProps?: {
    onClickTab?: (tab: string) => void;
    loading?: boolean;
    projects?: IProject[];
    fetchMore?: () => any;
    hasMore?: boolean;
    scrollRef?: MutableRefObject<any>;
  };
  cardListByCountryProps?: {
    loadingByCountry: boolean;
    projectsByCountry: IProject[];
    fetchMoreByCountry?: () => any;
    hasMoreByCountry?: boolean;
    scrollRefProjectsByCountry?: MutableRefObject<any>;
    selectedCountryCode: string;
    setShowProjectsList: Dispatch<SetStateAction<boolean>>;
  };
  mapProps?: {
    onClickCountryFlagMarker: (string) => Promise<IProject[]>;
  };
  showProjectsList: boolean;
}

interface ICountriesArray {
  country_code: string;
  korName: string;
  engName: string;
  lat: number;
  lng: number;
}

export default function HomePresenter({
  cardListProps: {
    onClickTab,
    projects,
    loading,
    fetchMore,
    hasMore,
    scrollRef,
  },
  cardListByCountryProps: {
    loadingByCountry,
    projectsByCountry,
    fetchMoreByCountry,
    hasMoreByCountry,
    scrollRefProjectsByCountry,
    selectedCountryCode,
    setShowProjectsList,
  },
  mapProps: { onClickCountryFlagMarker },
  showProjectsList,
}: IHomePresenterProps) {
  const countryName = useCountryCodeToLocaleCountryName({
    country_code: selectedCountryCode,
  });
  const { t } = useTranslation();
  const { locale, replace } = useRouter();

  // console.log(showProjectsList);
  return (
    <Flex>
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
                    variant="ghost"
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
        <Box id="map" w="50%" borderRadius="0px">
          <GoogleMap
            onClickCountryFlagMarker={onClickCountryFlagMarker}
            showProjectsList={showProjectsList}
          />
        </Box>
      </Show>
    </Flex>
  );
}
