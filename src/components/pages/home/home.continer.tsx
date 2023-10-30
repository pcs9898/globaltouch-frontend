import { gql, useLazyQuery, useQuery } from "@apollo/client";
import HomePresenter from "../../templates/home/home.presenert";
import {
  IProject,
  IQuery,
  IQueryFetchProjectsArgs,
  IQueryFetchProjectsByCountryArgs,
} from "@/src/commons/types/generated/types";
import { useEffect, useRef, useState } from "react";
import { FETCH_PROJECTS, FETCH_PROJECTS_BY_COUNTRY } from "./home.quires";
import { useRouter } from "next/router";

export default function HomeContainer() {
  const [hasMore, setHasMore] = useState(true);
  const [hasMoreByCountry, setHasMoreByCountry] = useState(true);
  const [tab, setTab] = useState("Trending");
  const [showProjectsList, setShowProjectsList] = useState(true);
  const [countryCode, setCountryCode] = useState(null);
  const scrollRef = useRef(null);
  const scrollRefProjectsByCountry = useRef(null);
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

  const [
    fetchProjectsByCountry,
    {
      loading: fetchProjectsByCountryLoading,
      data: fetchProjectsByCountryData,
      fetchMore: fetchProjectsByCountryMore,
    },
  ] = useLazyQuery<
    Pick<IQuery, "fetchProjectsByCountry">,
    IQueryFetchProjectsByCountryArgs
  >(FETCH_PROJECTS_BY_COUNTRY);

  const onClickTab = (newTab: string) => {
    setTab(newTab);
    setHasMore(true);
    scrollRef?.current?.scrollTo(0, 0);
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

  const fetchMoreProjectsByCountry = () => {
    if (!fetchProjectsByCountryData) return;

    fetchProjectsByCountryMore({
      variables: {
        offset:
          Math.ceil(
            fetchProjectsByCountryData?.fetchProjectsByCountry?.length / 8
          ) + 1,
        country_code: countryCode,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult?.fetchProjectsByCountry.length < 8) {
          setHasMoreByCountry(false);
        }

        return {
          fetchProjectsByCountry: [
            ...prev.fetchProjectsByCountry,
            ...fetchMoreResult.fetchProjectsByCountry,
          ],
        };
      },
    });
  };

  const onClickCountryFlagMarker = async (
    country_code
  ): Promise<IProject[]> => {
    router.replace("/", `country/${country_code}`, { shallow: true });

    scrollRefProjectsByCountry?.current?.scrollTo(0, 0);
    setShowProjectsList(false);
    setHasMoreByCountry(true);
    setCountryCode(country_code);
    const result = await fetchProjectsByCountry({
      variables: {
        country_code,
        offset: 1,
      },
    });

    return result.data.fetchProjectsByCountry;
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
      }}
      cardListByCountryProps={{
        loadingByCountry: fetchProjectsByCountryLoading,
        projectsByCountry: fetchProjectsByCountryData?.fetchProjectsByCountry,
        hasMoreByCountry: hasMoreByCountry,
        fetchMoreByCountry: fetchMoreProjectsByCountry,
        scrollRefProjectsByCountry: scrollRefProjectsByCountry,
        selectedCountryCode: countryCode,
        setShowProjectsList: setShowProjectsList,
      }}
      mapProps={{
        onClickCountryFlagMarker,
      }}
      showProjectsList={showProjectsList}
    />
  );
}
