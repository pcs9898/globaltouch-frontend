import { useEffect, useRef, useState } from "react";
import SearchPresenter from "../../templates/search/search.presenter";
import { FETCH_PROJECTS } from "../home/home.queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchProjectsArgs,
  IQuerySearchProjectsArgs,
} from "@/src/commons/types/generated/types";
import { SEARCH_PROJECTS } from "./search.queries";
import { debounce } from "lodash";

export default function SearchContainer() {
  const [selectedTabs, setSelectedTabs] = useState("Basic");
  const [basicSelectedTab, setSelectedBasicTab] = useState("Trending");
  const [hasMoreSearchTabs, setHasMoreSearchTabs] = useState(true);
  const [searchSelectedTab, setSelectedSearchTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRefSearchCardList = useRef(null);
  const scrollRefBasicCardList = useRef(null);
  const tabBtnRef = useRef<HTMLButtonElement>();
  const inputRef = useRef<HTMLInputElement>();

  // tabs state부터 하기
  const { data: basicTabsData, loading: basicTabLoading } = useQuery<
    Pick<IQuery, "fetchProjects">,
    IQueryFetchProjectsArgs
  >(FETCH_PROJECTS, {
    variables: {
      fetchProjectsOption: basicSelectedTab,
      offset: 1,
    },
  });

  const [
    searchProjects,
    {
      data: searchTabsData,
      loading: searchTabLoading,
      fetchMore: searchTabFetchMore,
    },
  ] = useLazyQuery<Pick<IQuery, "searchProjects">, IQuerySearchProjectsArgs>(
    SEARCH_PROJECTS
  );

  const onClickTabBasicTab = (tab: string) => {
    scrollRefSearchCardList?.current?.scrollTo(0, 0);
    setSelectedBasicTab(tab);
  };

  const onClickTabSearchTab = (tab: string) => {
    setSelectedSearchTab(tab);
    scrollRefSearchCardList?.current?.scrollTo(0, 0);

    searchProjects({
      variables: {
        searchTerm: searchTerm,
        project_category: tab,
        offset: 1,
      },
    });
  };

  const onChangeInput = (searchedTerm: string) => {
    if (searchedTerm === "") {
      setSelectedTabs("Basic");

      setSelectedSearchTab("All");
      if (tabBtnRef.current) {
        tabBtnRef?.current?.click();
      }
      return;
    }

    const search = () => {
      if (tabBtnRef.current && document.activeElement !== tabBtnRef.current) {
        tabBtnRef.current.click();
        inputRef.current.focus();
      }
      setSearchTerm(searchedTerm);
      setSelectedTabs("Search");
      setSelectedBasicTab("Trending");

      searchProjects({
        variables: {
          searchTerm: searchedTerm,
          project_category: "All",
          offset: 1,
        },
      });
    };

    const debouncedSearch = debounce(search, 500);
    debouncedSearch();
  };

  const fetchMoreSearchData = () => {
    if (!searchTabsData) return;
    searchTabFetchMore({
      variables: {
        searchTerm,
        project_category: searchSelectedTab,
        offset: Math.ceil(searchTabsData?.searchProjects.length / 8) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult?.searchProjects.length < 8) {
          setHasMoreSearchTabs(false);
        }

        return {
          searchProjects: [
            ...prev?.searchProjects,
            ...fetchMoreResult.searchProjects,
          ],
        };
      },
    });
  };

  return (
    <SearchPresenter
      onChangeInput={onChangeInput}
      selectedTabs={selectedTabs}
      inputRef={inputRef}
      customTabProps={{
        onClickTab1: onClickTabBasicTab,
        onClickTab2: onClickTabSearchTab,
        categoryKindOption:
          selectedTabs === "Basic"
            ? "searchProjectCategory"
            : "projectCategory",
        tabBtnRef: tabBtnRef,
      }}
      //   kindTab={selectedTabs}
      cardListProps={{
        projects:
          selectedTabs === "Basic"
            ? basicTabsData?.fetchProjects
            : searchTabsData?.searchProjects,
        loading: selectedTabs === "Basic" ? basicTabLoading : searchTabLoading,
        hasMore: hasMoreSearchTabs,
        scrollRef: scrollRefSearchCardList,
        fetchMore: fetchMoreSearchData,
      }}
    />
  );
}
