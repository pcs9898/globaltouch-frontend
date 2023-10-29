import { Box, Flex, Show } from "@chakra-ui/react";
import CardList from "../../organisms/cardList";

export interface IHomePresenterProps {
  cardListProps: {
    onClickTab: (tab: string) => void;
    loading: boolean;
    projectCardList?: {
      total: number;
      projects: {
        amount_raised: number;
        amount_required: number;
        countryCode: {
          country_code: string;
        };
        cityName: string;
        project_id: string;
        project_image_url: string;
        title: string;
      }[];
    };
    infiniteScrollLoadMore?: () => any;
  };
}

export default function HomePresenter({
  cardListProps: {
    onClickTab,
    projectCardList,
    loading,
    infiniteScrollLoadMore,
  },
}: IHomePresenterProps) {
  return (
    <Flex>
      <Show above="md">
        <Box id="cardList" w="50%" shadow="base" borderRadius="0px" px="1rem">
          <CardList
            customTabProps={{
              onClickTab,
              categoryKindOption: "projectListCategory",
            }}
            cardListProps={{ projectCardList, loading, infiniteScrollLoadMore }}
          />
        </Box>
        <Box id="map" w="50%"></Box>
      </Show>
    </Flex>
  );
}
