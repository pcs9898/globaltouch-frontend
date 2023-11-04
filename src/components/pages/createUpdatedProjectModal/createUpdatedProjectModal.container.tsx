import CreateProjectUpdateModalPresenter from "../../templates/createUpdatedProjectModal/createUpdatedProjectModal.presenter";
import { useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateUpdatedProjectArgs,
} from "@/src/commons/types/generated/types";
import { useToast } from "@chakra-ui/react";

const CREATE_UPDATED_PROJECT_MUTATION = gql`
  mutation createUpdatedProject(
    $createUpdatedProjectDTO: CreateUpdatedProjectDTO!
  ) {
    createUpdatedProject(createUpdatedProjectDTO: $createUpdatedProjectDTO) {
      content
      updatedProject_id
      created_at
    }
  }
`;

interface ICreateUpdatedProjectModalContainer {
  isMd: boolean;
}

export default function CreateUpdatedProjectModalContainer({
  isMd,
}: ICreateUpdatedProjectModalContainer) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  const toast = useToast();

  const [createUpdatedProjectMutation, { loading, error }] = useMutation<
    Pick<IMutation, "createUpdatedProject">,
    IMutationCreateUpdatedProjectArgs
  >(CREATE_UPDATED_PROJECT_MUTATION);

  const onClickSubmit = async () => {
    setCloseModal(true);
    // setIsLoading(true);

    try {
      await createUpdatedProjectMutation({
        variables: {
          createUpdatedProjectDTO: {
            content,
            project_id: router.query.projectId as string,
          },
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchUpdatedProjects: (prev, { readField }) => {
                return [data.createUpdatedProject, ...prev];
              },
            },
          });
        },
      });

      toast({
        status: "success",
        title: "Successfully create update project",
      });

      setCloseModal(true);
      setIsLoading(false);
      setContent("");

      setTimeout(() => {
        setCloseModal(false);
      }, 100);
    } catch (error) {
      toast({
        status: "error",
        title: error.message,
      });
      setIsLoading(false);
    }
  };

  const onChangeContent = (e) => {
    const value = e.target.value;
    if (value === "") {
      setContent(null);
    } else {
      setContent(value);
    }
  };

  return (
    <CreateProjectUpdateModalPresenter
      onChangeContent={onChangeContent}
      onClickSubmit={onClickSubmit}
      isLoading={isLoading}
      isValid={!!content}
      closeModalBoolean={closeModal}
      isMd={isMd}
    />
  );
}
