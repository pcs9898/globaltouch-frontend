import CustomTab from "../../molecules/customTab";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomCard from "../../molecules/customCard";
import { Box, Flex } from "@chakra-ui/react";

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
    infiniteScrollLoadMore?: () => any;
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
  } = cardListProps;

  return (
    <Flex flexDir="column" w="100%" height="100%">
      <CustomTab
        onClickTab={onClickTab}
        categoryKindOption={categoryKindOption}
      />

      <InfiniteScroll
        dataLength={projectTotal || donationTotal}
        next={infiniteScrollLoadMore}
        hasMore={
          (projects && projects.length < projectTotal) ||
          (donations && donations.length < donationTotal)
        }
        loader={<div>Loading</div>} //have to make loading
        endMessage={<div>end</div>} //have to end too loading
      >
        <Box
          gap="1rem"
          display={{ base: "flex", md: "grid" }}
          flexDir="column"
          gridTemplateColumns={{ md: "repeat(2, 1fr)" }}
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
        </Box>
      </InfiniteScroll>
    </Flex>
  );
}
