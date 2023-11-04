import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import ProjectPresenter from "../../templates/projectDetail/project.presenter";
import {
  CREATE_PROJECT_COMMENT,
  DELETE_PROJECT_COMMENT,
  FETCH_PROJECT,
  FETCH_PROJECT_COMMENTS,
  FETCH_UPDATED_PROJECTS,
  FETCH_USER_DONATED_N_COMMENTED,
} from "./project.queries";
import {
  IMutation,
  IMutationCreateProjectCommentArgs,
  IMutationDeleteProjectCommentArgs,
  IQuery,
  IQueryFetchProjectArgs,
  IQueryFetchProjectCommentsArgs,
  IQueryFetchUpdatedProjectsArgs,
  IQueryFetchUserDonatedNCommentedArgs,
} from "@/src/commons/types/generated/types";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ProjectContainer() {
  const router = useRouter();
  const toast = useToast();
  const projectId = router.query.projectId;
  const [isShowCommentInput, setIsShowCommentInput] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(true);

  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useQuery<Pick<IQuery, "fetchProject">, IQueryFetchProjectArgs>(
    FETCH_PROJECT,
    {
      variables: {
        project_id: projectId as string,
      },
    }
  );

  if (projectError) {
    toast({
      status: "error",
      title: projectError.message,
    });
    router.push("/");
  }

  const { data: updatedProjectsData, loading: updatedProjectsLoading } =
    useQuery<
      Pick<IQuery, "fetchUpdatedProjects">,
      IQueryFetchUpdatedProjectsArgs
    >(FETCH_UPDATED_PROJECTS, {
      variables: {
        project_id: projectId as string,
      },
    });

  const {
    data: commentsData,
    loading: commentsLoading,
    fetchMore: commentsFetchMore,
  } = useQuery<
    Pick<IQuery, "fetchProjectComments">,
    IQueryFetchProjectCommentsArgs
  >(FETCH_PROJECT_COMMENTS, {
    variables: {
      offset: 1,
      project_id: projectId as string,
    },
    fetchPolicy: "network-only",
  });

  const { data: isShowCommentInputData, error: isShowCommentInputError } =
    useQuery<
      Pick<IQuery, "fetchUserDonatedNCommented">,
      IQueryFetchUserDonatedNCommentedArgs
    >(FETCH_USER_DONATED_N_COMMENTED, {
      variables: {
        project_id: projectId as string,
      },
    });

  useEffect(() => {
    if (isShowCommentInputData?.fetchUserDonatedNCommented) {
      if (
        isShowCommentInputData?.fetchUserDonatedNCommented.commented ===
          false &&
        isShowCommentInputData?.fetchUserDonatedNCommented.donated === true
      ) {
        setIsShowCommentInput(true);
      }
    }
  }, [isShowCommentInputData, projectData]);

  const [
    createCommentMutation,
    { data: createCommentData, loading: createCommentLoading },
  ] = useMutation<
    Pick<IMutation, "createProjectComment">,
    IMutationCreateProjectCommentArgs
  >(CREATE_PROJECT_COMMENT);
  isShowCommentInput;

  const [deleteCommentMutation, { data, loading }] = useMutation<
    Pick<IMutation, "deleteProjectComment">,
    IMutationDeleteProjectCommentArgs
  >(DELETE_PROJECT_COMMENT);

  const onClickCreateComment = async (commentContent: string) => {
    try {
      await createCommentMutation({
        variables: {
          createProjectCommentDTO: {
            project_id: projectId as string,
            content: commentContent,
          },
        },
        update(cache, { data }) {
          const newComment = data?.createProjectComment;

          const existingData = cache.readQuery({
            query: FETCH_USER_DONATED_N_COMMENTED,
            variables: { project_id: projectId },
          });

          if (existingData) {
            const updatedData = {
              donated: true,
              commented: true,
            };

            cache.writeQuery({
              query: FETCH_USER_DONATED_N_COMMENTED,
              variables: { project_id: projectId },
              data: { fetchUserDonatedNCommented: updatedData },
            });
          }

          const existingComments = cache.readQuery({
            query: FETCH_PROJECT_COMMENTS,
            variables: { project_id: projectId, offset: 1 },
          });

          if (existingComments) {
            cache.writeQuery({
              query: FETCH_PROJECT_COMMENTS,
              variables: { project_id: projectId, offset: 1 },
              data: {
                fetchProjectComments: [
                  newComment,
                  ...existingComments.fetchProjectComments,
                ],
              },
            });
          }
        },
      });
    } catch (error) {
      toast({
        status: "error",
        title: error.message,
      });
    }
  };

  const onClickDeleteComment = async (projectComment_id: string) => {
    try {
      await deleteCommentMutation({
        variables: {
          deleteProjectCommentDTO: {
            project_id: projectId as string,
            projectComment_id,
          },
        },
        update(cache, { data }) {
          const existingData = cache.readQuery({
            query: FETCH_USER_DONATED_N_COMMENTED,
            variables: { project_id: projectId },
          });

          if (existingData) {
            const updatedData = {
              donated: true,
              commented: false,
            };

            cache.writeQuery({
              query: FETCH_USER_DONATED_N_COMMENTED,
              variables: { project_id: projectId },
              data: { fetchUserDonatedNCommented: updatedData },
            });
          }

          const existingComments = cache.readQuery({
            query: FETCH_PROJECT_COMMENTS,
            variables: { project_id: projectId, offset: 1 },
          });

          if (existingComments) {
            const updatedComments =
              existingComments.fetchProjectComments.filter(
                (item) => item.projectComment_id !== projectComment_id
              );

            cache.writeQuery({
              query: FETCH_PROJECT_COMMENTS,
              variables: { project_id: projectId, offset: 1 },
              data: {
                fetchProjectComments: updatedComments,
              },
            });
          }
          cache.modify({
            fields: {
              fetchProjectComments: (prev, { readField }) => {
                const deleteCommentsArray = prev.filter(
                  (item) => item.projectComment_id !== projectComment_id
                );
                return [...deleteCommentsArray];
              },
              fetchUserDonatedNCommented: (prev, { readField }) => {
                return { commented: false, donated: true };
              },
            },
          });
        },
      });
    } catch (error) {
      toast({
        status: "error",
        title: error.message,
      });
    }
  };

  const fetchMoreComments = () => {
    if (!commentsData) return;

    console.log("hi");

    commentsFetchMore({
      variables: {
        offset: Math.ceil(commentsData?.fetchProjectComments?.length / 10) + 1,
        project_id: projectId,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult?.fetchProjectComments.length < 10) {
          setHasMoreComments(false);
        }

        return {
          fetchProjectComments: [
            ...prev.fetchProjectComments,
            ...fetchMoreResult.fetchProjectComments,
          ],
        };
      },
    });
  };

  return (
    <ProjectPresenter
      projectProps={{
        project: projectData?.fetchProject,
        projectLoading: projectLoading,
      }}
      updatedProjectsProps={{
        updatedProjects: updatedProjectsData?.fetchUpdatedProjects,
        updatedProjectsLoading: updatedProjectsLoading,
      }}
      commentsProps={{
        isShowCommentInput:
          isShowCommentInputData?.fetchUserDonatedNCommented.commented ===
            false &&
          isShowCommentInputData?.fetchUserDonatedNCommented.donated === true,
        onClickCreateComment: onClickCreateComment,
        createCommentLoading: createCommentLoading,
        commentsData: commentsData?.fetchProjectComments,
        onClickDeleteComment: onClickDeleteComment,
        fetchMoreComments: fetchMoreComments,
        hasMoreComments: hasMoreComments,
        commentsLoading: commentsLoading,
      }}
    />
  );
}
