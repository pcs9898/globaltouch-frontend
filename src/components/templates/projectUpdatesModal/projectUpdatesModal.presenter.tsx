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
        gap="2rem"
        w="100%"
        overflow="scroll"
        colorScheme="teal"
        display="block"
      >
        {updatedProjects.map((project, i) => (
          <Box pb="2rem" key={i}>
            <Step>
              <StepIndicator>
                <StepStatus />
              </StepIndicator>

              <Box h="100%" w="100%">
                <StepTitle>
                  <Text whiteSpace="normal">
                    {formatTimeAgo(project.created_at)}
                  </Text>
                </StepTitle>
                <StepDescription>
                  <Text>{project.content}</Text>
                </StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          </Box>
        ))}
      </Stepper>
    </CustomModal>
  );
}
