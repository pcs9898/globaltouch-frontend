import { useTranslation } from "next-i18next";
import CustomModal from "../../organisms/customModal";
import { Avatar, Button, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import { ChangeEvent } from "react";

interface IEditProfilePresenterProps {
  onClickModalHeaderBtn: () => void;
  onChangeNameInput: (name: string) => void;
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
  previewImage: string;
  isLoading: boolean;
  isValid: boolean;
  closeModal: boolean;
}

export default function EditProfilePresenter({
  onClickModalHeaderBtn,
  onChangeNameInput,
  onChangeFile,
  previewImage,
  isLoading,
  isValid,
  closeModal,
}: IEditProfilePresenterProps) {
  const { t } = useTranslation();
  const user = useRecoilValue(userState);

  return (
    <CustomModal
      modalHeaderTxt={t("editProfileModalHeaderTitle")}
      modalBtnTxt={t("editProfileModalHeaderTitle")}
      modalHeaderBtn={t("editProfileModalHeaderBtn")}
      isBoth={true}
      onClickModalHeaderBtn={onClickModalHeaderBtn}
      isLoading={isLoading}
      isOnClickModalHeaderBtnValid={isValid}
      isHide={true}
      closeModalBoolean={closeModal}
    >
      <Flex gap="1rem" w="100%" mb="1rem">
        <Avatar
          src={previewImage ?? user.profile_image_url}
          name={user.name}
          w="5rem"
          h="5rem"
        />
        <Flex flexDir="column">
          <Flex
            flexDir="column"
            fontWeight="semibold"
            fontSize="1.5rem"
            gap="0.25rem"
            alignItems="flex-start"
          >
            <Text>{user.name}</Text>
            <FormLabel
              htmlFor="image-upload"
              h="100%"
              mx="0"
              display="flex"
              alignItems="center"
            >
              <Button
                colorScheme="gray"
                as="label"
                htmlFor="image-upload"
                cursor="pointer"
              >
                {t("editProfileModalChangePhotoBtn")}
              </Button>
            </FormLabel>
            <Input
              type="file"
              id="image-upload"
              accept="image/*"
              display="none"
              onChange={(e) => onChangeFile(e)}
            />
          </Flex>
        </Flex>
      </Flex>
      <Input
        placeholder={user.name}
        onChange={(e) => onChangeNameInput(e.target.value)}
        variant="filled"
        colorScheme="gray"
      />
    </CustomModal>
  );
}
