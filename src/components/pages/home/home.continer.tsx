import { gql, useLazyQuery, useQuery } from "@apollo/client";
import HomePresenter from "../../templates/home/home.presenert";
import {
  IProject,
  IQuery,
  IQueryFetchProjectsArgs,
} from "@/src/commons/types/generated/types";
import { useEffect, useRef, useState } from "react";
import { FETCH_PROJECTS } from "./home.quires";

export default function HomeContainer() {
  const [hasMore, setHasMore] = useState(true);
  const [tab, setTab] = useState("Trending");
  const scrollRef = useRef(null);

  const { data, loading, fetchMore } = useQuery<
    Pick<IQuery, "fetchProjects">,
    IQueryFetchProjectsArgs
  >(FETCH_PROJECTS, {
    variables: {
      offset: 1,
      fetchProjectsOption: tab,
    },
    fetchPolicy: "network-only",
  });

  const onClickTab = (newTab: string) => {
    setTab(newTab);
    setHasMore(true);
    scrollRef?.current?.scrollTo(0, 0);
  };

  const fetchMoreProjects = () => {
    if (!data) return;

    fetchMore({
      variables: {
        offset: Math.ceil(data?.fetchProjects.length / 8) + 1,
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
        projects: data?.fetchProjects,
        onClickTab,
        loading: loading,
        fetchMore: fetchMoreProjects,
        hasMore: hasMore,
        scrollRef: scrollRef,
      }}
    />
  );
}
