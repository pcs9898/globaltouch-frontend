import { useTranslation } from "next-i18next";
import CustomModal from "../../organisms/customModal";
import { Textarea } from "@chakra-ui/react";

interface ICreateProjectUpdateModalPresenterProps {
  onChangeContent: (e: any) => void;
  onClickSubmit: () => void;
  isLoading: boolean;
  isValid: boolean;
  closeModalBoolean: boolean;
  isMd: boolean;
}

export default function CreateUpdatedProjectModalPresenter({
  onChangeContent,
  onClickSubmit,
  isLoading,
  isValid,
  closeModalBoolean,
  isMd,
}: ICreateProjectUpdateModalPresenterProps) {
  const { t } = useTranslation();

  return (
    <CustomModal
      modalHeaderTxt={t("updateProjectModalHeaderTitle")}
      modalHeaderBtn={t("updateProjectModalHeaderBtn")}
      onClickModalHeaderBtn={onClickSubmit}
      isLoading={isLoading}
      isOnClickModalHeaderBtnValid={isValid}
      modalBtnTxt={t("updateProjectModalHeaderTitle")}
      isTealColorBtn={true}
      isMd={isMd}
      closeModalBoolean={closeModalBoolean}
    >
      <Textarea
        placeholder={t("updateProjectModalInput")}
        onChange={onChangeContent}
        variant="filled"
        h="100%"
      />
    </CustomModal>
  );
}
