import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import CardList from "../../organisms/cardList";
import {
  IProject,
  IProjectDonation,
} from "@/src/commons/types/generated/types";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import CustomTab from "../../molecules/customTab";
import InfiniteScroll from "react-infinite-scroll-component";
import EndMessage from "../../molecules/infiniteScroll/endMessage";
import CustomSkeleton from "../../molecules/customSkeleton";
import CustomCard from "../../molecules/customCard";
import StickyBox from "react-sticky-box";
import CustomSimpleCard from "../../molecules/customSimpleCard";
import { StickyContainer, Sticky } from "react-sticky";
import Headroom from "react-headroom";

export interface ISearchPresenterProps {
  onChangeInput: (searchedTerm: string) => void;
  selectedTabs: string;
  inputRef: MutableRefObject<any>;
  customTabProps: {
    onClickTab1: (tab: string) => void;
    onClickTab2: (tab: string) => void;
    categoryKindOption:
      | "projectListCategory"
      | "projectCategory"
      | "searchProjectCategory"
      | "profileCategory";
    tabBtnRef: MutableRefObject<any>;
  };
  //   kindTab: string;
  cardListProps: {
    projects?: IProject[];
    fetchMore?: () => void;
    loading: boolean;
    hasMore: boolean;
    scrollRef: MutableRefObject<any>;
  };
}

export default function SearchPresenter({
  onChangeInput,
  selectedTabs,
  inputRef,
  customTabProps: { onClickTab1, onClickTab2, categoryKindOption, tabBtnRef },
  cardListProps: { projects, loading, fetchMore, hasMore, scrollRef },
}: ISearchPresenterProps) {
  const { t } = useTranslation();

  return (
    <Box
      flexDir="row"
      h={{ base: "calc(100vh - 3.5rem)", md: "calc(100vh - 5rem)" }}
      overflow="auto"
      gap="0"
      id="scrollableDiv"
      ref={scrollRef}
      w="100%"
    >
      <Center>
        <Flex flexDir="column" maxW="container.md" w="100%">
          <Heading
            textAlign="center"
            fontSize={{ base: "1.75rem", md: "2.5rem" }}
            mt={{ base: "1.5rem", md: "2rem" }}
          >
            {t("topSearchHeaderTitle")}
          </Heading>
          <Text
            color="gray"
            fontWeight="medium"
            textAlign="center"
            mb={{ base: "1.5rem", md: "2rem" }}
          >
            {t("topSearchHeaderText")}
          </Text>
          <StickyBox
            offsetTop={0}
            offsetBottom={20}
            style={{
              zIndex: "1",
              backgroundColor: "white",
              borderRadius: "0px",
              width: "100%",
            }}
          >
            <Flex
              // gap={{ base: "0.5rem", md: "1.5rem" }}
              gap="1rem"
              flexDirection="column"
              borderRadius="0px"
              bg="white"
              pb="1rem"
              width="100%"
            >
              <InputGroup maxW="34.75rem" alignSelf="center" w="100%">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray" />
                </InputLeftElement>
                <Input
                  w="100%"
                  variant="filled"
                  placeholder={t("searchInputText")}
                  onChange={(e) => onChangeInput(e.target.value)}
                  ref={inputRef}
                />
              </InputGroup>

              {categoryKindOption === "searchProjectCategory" ? (
                <CustomTab
                  onClickTab={onClickTab1}
                  categoryKindOption="searchProjectCategory"
                  tabBtnRef={tabBtnRef}
                />
              ) : (
                <CustomTab
                  onClickTab={onClickTab2}
                  categoryKindOption="projectCategory"
                  tabBtnRef={tabBtnRef}
                />
              )}
            </Flex>
          </StickyBox>
          {selectedTabs === "Basic" ? (
            <Box
              display={{ base: "flex", md: "grid" }}
              flexDirection={{ base: "column", md: "initial" }}
              gridTemplateColumns={{ base: "initial", md: "repeat(2, 1fr)" }}
              gap="1rem"
              h="min-content"
            >
              {loading
                ? Array.from({ length: 4 }, (_, i) => (
                    <CustomSkeleton key={i} skeletonType="projectCard" />
                  ))
                : projects
                    ?.slice(0, 4)
                    .map((project) => (
                      <CustomSimpleCard
                        key={project.project_id}
                        project={project}
                      />
                    ))}
            </Box>
          ) : (
            <Box w="100%">
              <InfiniteScroll
                dataLength={projects?.length ?? 0}
                next={fetchMore}
                hasMore={hasMore}
                loader={loading && <Spinner />}
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
                >
                  {loading ? (
                    Array.from({ length: 8 }, (_, i) => (
                      <CustomSkeleton key={i} skeletonType="projectCard" />
                    ))
                  ) : projects.length > 0 ? (
                    projects?.map((project) => (
                      <CustomCard key={project.project_id} project={project} />
                    ))
                  ) : (
                    <Flex>No results</Flex>
                  )}
                </Box>
              </InfiniteScroll>
            </Box>
          )}
        </Flex>
      </Center>
    </Box>
  );
}
