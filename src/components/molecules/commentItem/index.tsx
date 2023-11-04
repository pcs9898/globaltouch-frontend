import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Show,
  Text,
  cookieStorageManager,
  useDisclosure,
} from "@chakra-ui/react";
import { useCountryCodeToLocaleCountryName } from "../../customhooks/useCountryCodeToLocaleCountryName";
import { useAmountToFormatCurrency } from "../../customhooks/useAmountToFormatCurrency";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useRecoilValue } from "recoil";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import { useTranslation } from "react-i18next";
import { IProjectComment } from "@/src/commons/types/generated/types";
import { useFormatTimeAgoVer2 } from "../../customhooks/useFormatTimgAgoVer2";
import { useState } from "react";

interface ICommentItemProps {
  commentItemData?: Partial<IProjectComment>;
  onClickDeleteComment: (string) => void;
}

export default function CommentItem({
  commentItemData,
  onClickDeleteComment,
}: ICommentItemProps) {
  const {
    projectComment_id,
    content,
    maxDonationAmount,
    created_at,
    user: { profile_image_url, user_id, name },
  } = commentItemData;

  const loggedInUser = useRecoilValue(userState);
  const { t } = useTranslation();
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Flex gap="0.75rem" width="100%">
      <Avatar size="md" src={profile_image_url} name={name} />

      <Flex flexDirection="column" width="100%" gap="0.5rem">
        <Flex flexDirection="column" width="100%">
          <Flex>
            <Flex fontWeight="bold">{name}</Flex>
            {loggedInUser?.user_id === user_id && (
              <Badge
                colorScheme="teal"
                ml="0.5rem"
                display="flex"
                alignItems="center"
              >
                {t("commentItemAuthor")}
              </Badge>
            )}
          </Flex>

          <Flex
            gap="0.25rem"
            fontWeight="medium"
            fontSize="0.875rem"
            color="gray"
          >
            <Text>
              {useAmountToFormatCurrency({ amount: maxDonationAmount })}
            </Text>
            <Text>&bull;</Text>
            <Text>{useFormatTimeAgoVer2({ timestamp: created_at })}</Text>
          </Flex>
        </Flex>

        <Text>{content}</Text>
      </Flex>

      {loggedInUser?.user_id === user_id && (
        <Popover onOpen={onOpen} onClose={onClose}>
          <PopoverTrigger>
            <IconButton
              aria-label="menu"
              display="flex"
              alignItems="flex-start"
              icon={<MoreHorizOutlinedIcon />}
              variant="unstyled"
            />
          </PopoverTrigger>
          <PopoverContent w="100%" borderRadius="12px" bgColor="transparent">
            <PopoverBody
              w="max-content"
              p={0}
              borderRadius="12px"
              bgColor="transparent"
            >
              <Button
                w="100%"
                colorScheme="red"
                borderRadius="0px"
                borderTopRadius="12px"
                onClick={() => {
                  onClose();
                  onClickDeleteComment(projectComment_id);
                }}
              >
                Delete
              </Button>
              <Button
                w="100%"
                colorScheme="gray"
                borderRadius="0px"
                borderBottomRadius="12px"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </Flex>
  );
}
