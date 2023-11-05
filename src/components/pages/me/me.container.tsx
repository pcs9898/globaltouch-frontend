import {
  IProject_Category_Enum,
  IQuery,
  IQueryFetchUserLoggedInDonationsArgs,
  IQueryFetchUserLoggedInProjectsArgs,
} from "@/src/commons/types/generated/types";
import MePresenter from "../../templates/me/me.presenter";
import { useRef, useState } from "react";

import { FETCH_MY_DONATIONS, FETCH_MY_PROJECTS } from "./me.querires";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/src/commons/libraries/recoil/auth.recoil";

export default function MeContainer() {
  const [selectedTab, setSelectedTab] = useState("Donation History");
  const scrollRef = useRef<HTMLDivElement>();
  const buttonRef = useRef<HTMLButtonElement>();
  const [hasMoreDonation, setHasMoreDonation] = useState(true);
  const [hasMoreProject, setHasMoreProject] = useState(true);
  const accessToken = useRecoilValue(accessTokenState);

  const {
    data: donationData,
    loading: donationLoading,
    fetchMore: donationFetchMore,
  } = useQuery<
    Pick<IQuery, "fetchUserLoggedInDonations">,
    IQueryFetchUserLoggedInDonationsArgs
  >(FETCH_MY_DONATIONS, {
    variables: {
      offset: 1,
    },
  });

  const [
    fetchMyProjects,
    { data: projectData, loading: projectLoading, fetchMore: projectFetchMore },
  ] = useLazyQuery<
    Pick<IQuery, "fetchUserLoggedInProjects">,
    IQueryFetchUserLoggedInProjectsArgs
  >(FETCH_MY_PROJECTS);

  const onClickTab = (tabName: string) => {
    setSelectedTab(tabName);
    scrollRef.current.scrollTo(0, 0);
    if (tabName === "My Projects") {
      fetchMyProjects({
        variables: {
          offset: 1,
        },
      });
    }
  };

  const fetchMoreDonations = () => {
    if (!donationData) return;
    donationFetchMore({
      variables: {
        offset:
          Math.ceil(donationData?.fetchUserLoggedInDonations.length / 8) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult?.fetchUserLoggedInDonations.length < 8) {
          setHasMoreDonation(false);
        }

        return {
          fetchUserLoggedInDonations: [
            ...prev?.fetchUserLoggedInDonations,
            ...fetchMoreResult?.fetchUserLoggedInDonations,
          ],
        };
      },
    });
  };

  const fetchMoreProjects = () => {
    if (!projectData) return;

    projectFetchMore({
      variables: {
        offset:
          Math.ceil(projectData?.fetchUserLoggedInProjects.length / 8) + 1,
      },
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return;
        if (fetchMoreResult?.fetchUserLoggedInProjects.length < 8) {
          setHasMoreProject(false);
        }

        return {
          fetchUserLoggedInProjects: [
            ...prev?.fetchUserLoggedInProjects,
            ...fetchMoreResult?.fetchUserLoggedInProjects,
          ],
        };
      },
    });
  };

  const onClickEditProfile = () => {};
  const onClickOpenEditProfileModal = () => {};

  return (
    <MePresenter
      onClickTab={onClickTab}
      scrollRef={scrollRef}
      buttonRef={buttonRef}
      selectedTab={selectedTab}
      onClickOpenEditProfileModal={onClickOpenEditProfileModal}
      donationProps={{
        donations: donationData?.fetchUserLoggedInDonations,
        donationLoading: donationLoading,
        donationHasMore: hasMoreDonation,
        donationFetchMore: fetchMoreDonations,
      }}
      projectProps={{
        projects: projectData?.fetchUserLoggedInProjects,
        projectLoading: projectLoading,
        projectHasMore: hasMoreProject,
        projectFetchMore: fetchMoreProjects,
      }}
    />
  );
}
