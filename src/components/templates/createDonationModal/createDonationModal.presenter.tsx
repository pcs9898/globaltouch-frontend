import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import CustomModal from "../../organisms/customModal";
import { useTranslation } from "next-i18next";
import { useState } from "react";

interface ICreateDonationModalPresenterProps {
  customModalUIProps: {
    project_title: string;
    project_user_name: string;
  };
  customModalLogicProps: {
    amount: number;
    isLoading: boolean;
    closeModalBoolean: any;
    onClickSubmit: () => void;
    onChangeAmount: (e: any) => void;
    isMd: boolean;
  };
}

export default function CreateDonationModalPresenter({
  customModalLogicProps: {
    amount,
    closeModalBoolean,
    isLoading,
    onClickSubmit,
    onChangeAmount,
    isMd,
  },
  customModalUIProps: { project_title, project_user_name },
}: ICreateDonationModalPresenterProps) {
  const { t } = useTranslation();

  return (
    <CustomModal
      modalHeaderTxt={t("createDonationModalHeaderTitle")}
      modalHeaderBtn={t("createDonationModalHeaderBtn")}
      modalBtnTxt={t("asideDonationCardDonateBtn")}
      isTealColorBtn={true}
      isMd={isMd}
      isOnClickModalHeaderBtnValid={!!amount}
      isLoading={isLoading}
      closeModalBoolean={closeModalBoolean}
      onClickModalHeaderBtn={onClickSubmit}
    >
      <Flex gap="0.75rem" flexDir="column">
        <Flex fontSize="1rem" gap="0.25rem">
          <Text>{t("createDonationModalText1")}</Text>
          <Text fontWeight="bold">{project_title}</Text>
        </Flex>
        <Flex fontSize="0.875rem" gap="0.25rem" color="gray">
          <Text>
            <Text>{t("createDonationModalText2")}</Text>
          </Text>
          <Text fontWeight="bold">{project_user_name}</Text>
        </Flex>
        <InputGroup>
          <InputLeftAddon>{t("currency")}</InputLeftAddon>
          <Input
            placeholder={t("createDonationModalInput")}
            type="number"
            variant="filled"
            onChange={onChangeAmount}
          />
        </InputGroup>
      </Flex>
    </CustomModal>
  );
}
