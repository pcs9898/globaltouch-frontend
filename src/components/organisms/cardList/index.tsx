import CustomTab from "../../molecules/customTab";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomCard from "../../molecules/customCard";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface ICardListProps {
  customTabProps: {
    onClickTab: (tab: string) => void;
    categoryKindOption:
      | "projectListCategory"
      | "projectCategory"
      | "searchProjectCategory"
      | "profileCategory";
  };
  cardListProps: {
    projectCardList?: {
      total: number;
      projects: {
        amount_raised: number;
        amount_required: number;
        countryCode: {
          country_code: string;
        };
        project_id: string;
        cityName: string;
        project_image_url: string;
        title: string;
      }[];
    };
    donationCardList?: {
      total: number;
      donations: {
        amount: number;
        project_image_url: string;
        created_at: string;
        project: {
          project_id: string;
          title: string;
          countryCode: { country_code: string };
        };
      }[];
    };
    infiniteScrollLoadMore?: () => void;
    loading: boolean;
  };
}

export default function CardList({
  customTabProps,
  cardListProps,
}: ICardListProps) {
  const { onClickTab, categoryKindOption } = customTabProps;
  const {
    projectCardList: { total: projectTotal, projects } = {},
    donationCardList: { total: donationTotal, donations } = {},
    infiniteScrollLoadMore,
    loading,
  } = cardListProps;
  const { pathname } = useRouter();

  const isHomeLayout =
    pathname === "/" || pathname === "/country/[countryCode]";

  return (
    <Flex flexDir="column" w="100%" h="calc(100vh - 5rem)" overflow="auto">
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
        <CustomTab
          onClickTab={onClickTab}
          categoryKindOption={categoryKindOption}
        />
      </Box>

      {/* <Box
        overflowY="scroll"
        mt="4.5rem"
        pb="1rem"
        gap="1rem"
        h="100%"
        display={
          isHomeLayout
            ? { base: "flex", lg: "grid" }
            : { base: "flex", md: "grid" }
        }
        flexDir="column"
        gridTemplateColumns={{ md: "repeat(2, 1fr)" }}
      > */}
      <InfiniteScroll
        dataLength={projectTotal || donationTotal}
        next={infiniteScrollLoadMore}
        hasMore={
          (projects && projects.length < projectTotal) ||
          (donations && donations.length < donationTotal)
        }
        loader={<div>Loading</div>}
        endMessage={<div>end</div>}
      >
        {projects
          ? projects.map((project) => (
              <CustomCard key={project.project_id} projectData={project} />
            ))
          : donations.map((donation) => (
              <CustomCard
                key={donation.project.project_id}
                projectDonationData={donation}
              />
            ))}
      </InfiniteScroll>
      {/* </Box> */}
    </Flex>
  );
}
