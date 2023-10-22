import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useCountryCodeToLocaleCountryName } from "../../customhooks/useCountryCodeToLocaleCountryName";
import Link from "next/link";
import CustomSkeleton from "../customSkeleton";
import { IFetchUserLoggedInResponseDto } from "@/src/commons/types/generated/types";

interface IProfile {
  profileData: IFetchUserLoggedInResponseDto;
  onClickEditProfileBtn?: () => void;
  onClickMyProfileBtn?: () => void;
  onClickChangePhotoBtn?: () => void;
}

export default function Profile({
  profileData,
  onClickEditProfileBtn,
  onClickMyProfileBtn,
  onClickChangePhotoBtn,
}: IProfile) {
  //have to take real userloggedIn info later
  const {
    name,
    profile_image_url,
    countryCode: { country_code },
  } = profileData;
  const { t } = useTranslation();
  const countryName = useCountryCodeToLocaleCountryName({ country_code });
  return (
    <Flex gap="1rem">
      <Avatar src={profile_image_url} name={name} w="4.25rem" h="4.25rem" />
      <Flex flexDir="column">
        <Flex
          fontWeight="semibold"
          fontSize="1.5rem"
          gap="0.25rem"
          alignItems="flex-end"
        >
          <Text>{name}</Text>
          <Text>‧</Text>
          <Text fontWeight="normal" color="gray" fontSize="1.25rem">
            {countryName}
          </Text>
        </Flex>
        <Flex h="2rem" gap="0.5rem">
          {onClickEditProfileBtn && (
            <Button
              colorScheme="gray"
              h="100%"
              onClick={() => onClickEditProfileBtn}
            >
              {t("profileEditProfileBtn")}
            </Button>
          )}
          {onClickMyProfileBtn && (
            <Button colorScheme="gray" as={Link} href={"/me"}>
              {t("profilePopoverMyProfileBtn")}
            </Button>
          )}

          {onClickChangePhotoBtn && (
            <Button colorScheme="gray" onClick={() => onClickChangePhotoBtn}>
              {t("editProfileModalChangePhotoBtn")}
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
