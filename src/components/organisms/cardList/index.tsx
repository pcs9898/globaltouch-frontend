import CustomTab from "../../molecules/customTab";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomCard from "../../molecules/customCard";
import { Box, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  IProject,
  IProjectDonation,
} from "@/src/commons/types/generated/types";
import EndMessage from "../../molecules/infiniteScroll/endMessage";
import CustomSkeleton from "../../molecules/customSkeleton";
import { MutableRefObject } from "react";

interface ICardListProps {
  customTabProps: {
    onClickTab: (tab: string) => void;
    categoryKindOption:
      | "projectListCategory"
      | "projectCategory"
      | "searchProjectCategory"
      | "profileCategory";
    isFixed?: boolean;
  };
  cardListProps: {
    projects?: IProject[];
    donations?: IProjectDonation[];
    fetchMore?: () => void;
    loading: boolean;
    hasMore: boolean;
    scrollRef: MutableRefObject<any>;
  };
}

export default function CardList({
  customTabProps,
  cardListProps: {
    projects,
    donations,
    loading,
    fetchMore,
    hasMore,
    scrollRef,
  },
}: ICardListProps) {
  const { onClickTab, categoryKindOption, isFixed } = customTabProps;
  const { pathname } = useRouter();

  const isHomeLayout =
    pathname === "/" || pathname === "/country/[countryCode]";

  return (
    <Flex flexDir="column" w="100%">
      <Box
        position="fixed"
        top={{ md: "5rem" }}
        left="0px"
        zIndex={1}
        p="1rem"
        w={{ base: "40%", xl: "50%" }}
        borderRadius="0"
      >
        <CustomTab
          onClickTab={onClickTab}
          categoryKindOption={categoryKindOption}
        />
      </Box>

      <Box
        mt="4.5rem"
        w="100%"
        h="calc(100vh - 8.5rem)"
        overflow="auto"
        id="scrollableDiv"
        ref={scrollRef}
      >
        <InfiniteScroll
          dataLength={(projects?.length || donations?.length) ?? 0}
          next={fetchMore}
          hasMore={hasMore}
          loader={<Spinner />}
          endMessage={<EndMessage endMessageOptions="project" />}
          scrollableTarget="scrollableDiv"
        >
          <Flex
            display={{ base: "flex", xl: "grid" }}
            gridTemplateColumns={{ xl: "repeat(2, 1fr)" }}
            gap="1rem"
            flexDirection="column"
          >
            {loading
              ? Array.from({ length: 8 }, (_, i) => (
                  <CustomSkeleton key={i} skeletonType="projectCard" />
                ))
              : projects
              ? projects?.map((project) => (
                  <CustomCard key={project.project_id} project={project} />
                ))
              : donations?.map((donation) => (
                  <CustomCard
                    key={donation.project.project_id}
                    donation={donation}
                  />
                ))}
          </Flex>
        </InfiniteScroll>
      </Box>
    </Flex>
  );
}
