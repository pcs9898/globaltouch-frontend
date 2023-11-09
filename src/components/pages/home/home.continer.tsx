import { gql, useLazyQuery, useQuery } from "@apollo/client";
import HomePresenter from "../../templates/home/home.presenter";
import {
  IProject,
  IQuery,
  IQueryFetchProjectsArgs,
  IQueryFetchProjectsByCountryArgs,
} from "@/src/commons/types/generated/types";
import { useEffect, useRef, useState } from "react";
import { FETCH_PROJECTS } from "./home.queries";
import { useRouter } from "next/router";

export default function HomeContainer() {
  const [hasMore, setHasMore] = useState(true);
  const [tab, setTab] = useState("Trending");
  const [showProjectsList, setShowProjectsList] = useState(true);
  const scrollRef = useRef(null);
  const scrollRefMobile = useRef(null);
  const router = useRouter();

  const {
    data: fetchProjectsData,
    loading: fetchProjectsLoading,
    fetchMore: fetchProjectsMore,
  } = useQuery<Pick<IQuery, "fetchProjects">, IQueryFetchProjectsArgs>(
    FETCH_PROJECTS,
    {
      variables: {
        offset: 1,
        fetchProjectsOption: tab,
      },
      fetchPolicy: "network-only",
    }
  );

  const onClickTab = (newTab: string) => {
    setTab(newTab);
    setHasMore(true);
    scrollRef?.current?.scrollTo(0, 0);
    scrollRefMobile?.current?.scrollTo(0, 0);
  };

  const fetchMoreProjects = () => {
    if (!fetchProjectsData) return;

    fetchProjectsMore({
      variables: {
        offset: Math.ceil(fetchProjectsData?.fetchProjects.length / 8) + 1,
        fetchProjectsOption: tab,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult?.fetchProjects.length < 8) {
          setHasMore(false);
        }

        return {
          fetchProjects: [
            ...prev.fetchProjects,
            ...fetchMoreResult.fetchProjects,
          ],
        };
      },
    });
  };

  return (
    <HomePresenter
      cardListProps={{
        projects: fetchProjectsData?.fetchProjects,
        onClickTab,
        loading: fetchProjectsLoading,
        fetchMore: fetchMoreProjects,
        hasMore: hasMore,
        scrollRef: scrollRef,
        scrollRefMobile: scrollRefMobile,
      }}
      showProjectsList={showProjectsList}
    />
  );
}
