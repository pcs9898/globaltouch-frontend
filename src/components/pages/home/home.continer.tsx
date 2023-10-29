import { gql, useQuery } from "@apollo/client";
import HomePresenter from "../../templates/home/home.presenert";
import {
  IQuery,
  IQueryFetchProjectsTrendingArgs,
} from "@/src/commons/types/generated/types";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomCard from "../../molecules/customCard";
import { Box, Flex, Text } from "@chakra-ui/react";
import CustomTab from "../../molecules/customTab";
import { useRef, useState } from "react";

const FETCH_PROJECTS_TRENDING = gql`
  query fetchProjectsTrending(
    $fetchProjectsTrendingDTO: FetchProjectsTrendingDTO!
  ) {
    fetchProjectsTrending(fetchProjectsTrendingDTO: $fetchProjectsTrendingDTO) {
      project_id
      title
      amount_required
      amount_raised
      cityName
      countryCode {
        country_code
      }
      projectImages {
        image_url
      }
    }
  }
`;

export default function HomeContainer() {
  const [hasMore, setHasMore] = useState(true);
  const {
    data,
    loading: fetchProjectsTrendingLoading,
    fetchMore: fetchProjectsTrendingFetchMore,
  } = useQuery<
    Pick<IQuery, "fetchProjectsTrending">,
    IQueryFetchProjectsTrendingArgs
  >(FETCH_PROJECTS_TRENDING, {
    variables: {
      fetchProjectsTrendingDTO: {
        offset: 1,
      },
    },
  });

  const onClickTab = (tab: string) => {
    console.log(tab);
  };

  const loadMoreProjectsTrending = () => {
    fetchProjectsTrendingFetchMore({
      variables: {
        fetchProjectsTrendingDTO: {
          offset: Math.ceil(data.fetchProjectsTrending.length / 8) + 1,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        // 반환된 데이터가 10개 미만이면 더 이상 가져올 데이터가 없음을 판단
        if (fetchMoreResult.fetchProjectsTrending.length < 7) {
          console.log("jo");
          setHasMore(false);
        }
        return {
          fetchProjectsTrending: [
            ...prev.fetchProjectsTrending,
            ...fetchMoreResult.fetchProjectsTrending,
          ],
        };
      },
    });
  };

  return fetchProjectsTrendingLoading ? (
    <Box>Loading</Box>
  ) : (
    <Box w="100%" h="100%">
      <InfiniteScroll
        dataLength={data?.fetchProjectsTrending?.length}
        next={loadMoreProjectsTrending}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        endMessage={<div>end</div>}
      >
        {data?.fetchProjectsTrending?.map((project, i) => {
          console.log(project);
          return <CustomCard key={project.project_id} projectData={project} />;
        })}
      </InfiniteScroll>
    </Box>
  );
}

// 홈컨테이너 지도 정보 반으로나누고  적용부분부터 시작!!!!!!!!!
