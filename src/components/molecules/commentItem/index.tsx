import { Avatar, Flex, Text, cookieStorageManager } from "@chakra-ui/react";
import { useCountryCodeToLocaleCountryName } from "../../customhooks/useCountryCodeToLocaleCountryName";
import { useAmountToFormatCurrency } from "../../customhooks/useAmountToFormatCurrency";
import { IFetchProjectCommentsResponseDto } from "@/src/commons/types/generated/types";

interface ICommentItemProps {
  commentItemData: IFetchProjectCommentsResponseDto;
}

export default function CommentItem({ commentItemData }: ICommentItemProps) {
  const {
    projectComment_id,
    content,
    amount,
    user: {
      profile_image_url,
      user_id,
      name,
      countryCode: { country_code },
    },
  } = commentItemData;
  const countryName = useCountryCodeToLocaleCountryName({ country_code });

  return (
    <Flex gap="0.5rem" width="100%">
      <Avatar size="md" src={profile_image_url} name={name} />

      <Flex flexDirection="column" width="100%" gap="0.5rem">
        <Flex flexDirection="column" width="100%">
          <Flex fontWeight="semibold">{name}</Flex>
          {/* bedge로 userid비교후 author뱃지달기*/}

          <Flex gap="0.125rem" fontWeight="medium" fontSize="0.875rem">
            <Text>{useAmountToFormatCurrency({ amount })}</Text>
            <Text>‧</Text>
            <Text color="gray">{countryName}</Text>
          </Flex>
        </Flex>

        <Text>{content}</Text>
      </Flex>
    </Flex>
  );
}
