import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import { Avatar, Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useRecoilValue } from "recoil";

export interface ICommentInputProps {
  onClickCreateComment: (string) => void;
  createCommentLoading: boolean;
}

export default function CommentInput({
  onClickCreateComment,
  createCommentLoading,
}: ICommentInputProps) {
  const loggedInUser = useRecoilValue(userState);
  const [content, setContent] = useState("");
  const { t } = useTranslation();

  const onChangeInputContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <Flex w="100%" gap="0.5rem">
      <Avatar src={loggedInUser?.profile_image_url} name={loggedInUser?.name} />
      <Input
        placeholder={t("commentInputText")}
        onChange={(e) => onChangeInputContent(e)}
        variant="filled"
        onKeyUp={(e) => {
          if (e.key === "Enter" && content !== "") {
            onClickCreateComment(content);
          }
        }}
      />
      <Button
        onClick={() => onClickCreateComment(content)}
        isDisabled={content === "" || createCommentLoading}
      >
        {t("commentInputBtn")}
      </Button>
    </Flex>
  );
}
