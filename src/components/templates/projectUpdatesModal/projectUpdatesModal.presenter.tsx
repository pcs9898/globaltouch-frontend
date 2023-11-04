import { useTranslation } from "next-i18next";
import CustomModal from "../../organisms/customModal";
import {
  Box,
  Flex,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { IUpdatedProject } from "@/src/commons/types/generated/types";
import { useFormatTimeAgo } from "../../customhooks/useFormatTimgAgo";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { IProjectUpdatesModalPresenterProps } from "./projectUpdatesModal.types";
import formatTimeAgo from "@/src/commons/utils/formatTimeAgo";

export default function ProjectUpdatesModalPresenter({
  updatedProjects,
}: IProjectUpdatesModalPresenterProps) {
  const { t } = useTranslation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <CustomModal
      modalHeaderTxt={
        t("updatedProjectHeader") + `(${updatedProjects?.length})`
      }
      modalTxtBtnTxt={t("updatedProjectSeeOlderUpdate")}
    >
      <Stepper
        index={1}
        orientation="vertical"
        height="100%"
        gap="0"
        w="100%"
        overflow="scroll"
        colorScheme="teal"
      >
        {updatedProjects.map((project, i) => (
          <Box pb="1rem" key={i}>
            <Step>
              <StepIndicator>
                <StepStatus />
              </StepIndicator>

              <Box
                flexShrink="0"
                width={{
                  base: `${windowWidth - 100}px`,
                  md: "72vh",
                }}
                whiteSpace="normal"
              >
                <StepTitle>{formatTimeAgo(project.created_at)}</StepTitle>
                <StepDescription>{project.content}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          </Box>
        ))}
      </Stepper>
    </CustomModal>
  );
}
