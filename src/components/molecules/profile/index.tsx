import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useCountryCodeToLocaleCountryName } from "../../customhooks/useCountryCodeToLocaleCountryName";
import Link from "next/link";
import CustomSkeleton from "../customSkeleton";
import { IFetchUserLoggedInResponseDto } from "@/src/commons/types/generated/types";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import { useRecoilValue } from "recoil";

interface IProfile {
  onClickEditProfileBtn?: () => void;
  onClickMyProfileBtn?: () => void;
  onClickChangePhotoBtn?: () => void;
}

export default function Profile({
  onClickEditProfileBtn,
  onClickMyProfileBtn,
  onClickChangePhotoBtn,
}: IProfile) {
  //have to take real userloggedIn info later
  const userLoggedInInfo = useRecoilValue(userState);
  const { t } = useTranslation();

  return (
    userLoggedInInfo && (
      <Flex gap="1rem" w="100%">
        <Avatar
          src={userLoggedInInfo.profile_image_url}
          name={userLoggedInInfo.name}
          w="4.25rem"
          h="4.25rem"
        />
        <Flex flexDir="column">
          <Flex
            fontWeight="semibold"
            fontSize="1.5rem"
            gap="0.25rem"
            alignItems="flex-end"
          >
            <Text>{userLoggedInInfo.name}</Text>
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
              <Button colorScheme="gray" onClick={onClickMyProfileBtn}>
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
    )
  );
}
