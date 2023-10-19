import FormatTimeAgo from "@/src/components/customhooks/useFormatTimgAgo";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useCountryCodeToLocaleCountryName } from "../../customhooks/useCountryCodeToLocaleCountryName";
import Link from "next/link";
import { useState } from "react";
import { useAmountToFormatCurrency } from "../../customhooks/useAmountToFormatCurrency";
import { CalculatePercentage } from "@/src/commons/utils/calculatePercentage";
import {
  IFetchProjectsTrendingResponseDto,
  IFetchUserLoggedInDonationsResponseDto,
} from "@/src/commons/types/generated/types";

interface ICustomCard {
  // projectData?: {
  //   project_id?: string;
  //   title: string;
  //   amount_required: number;
  //   amount_raised: number;
  //   countryCode: {
  //     country_code: string;
  //   };
  //   projectImages: {
  //     image_url: string;
  //   };
  // };
  projectData?: IFetchProjectsTrendingResponseDto;
  projectDonationData?: IFetchUserLoggedInDonationsResponseDto;

  // 백엔드 부분 사진한장만 보내도록 수정해야야함

  // projectDonationData?: {
  //   amount: number;
  //   project: {
  //     project_id: string;
  //     title: string;
  //     created_at: string;
  //     countryCode: {
  //       country_code: string;
  //     };
  //     projectImages: {
  //       image_url;
  //     };
  //   };
  // };
}

export default function CustomCard({
  projectData,
  projectDonationData,
}: ICustomCard) {
  const {
    project_id: project_id_project,
    title: title_project,
    amount_raised,
    amount_required,
    countryCode: { country_code: country_code_project = null } = {},
    projectImages: { image_url: image_url_project = null } = {},
  } = projectData ?? {};

  const {
    amount,
    project: {
      project_id: project_id_projectDonation = null,
      created_at = null,
      title: title_projectDonation = null,
      countryCode: { country_code: country_code_projectDonation = null } = {},
      projectImages: { image_url: image_url_projectDonation = null } = {},
    } = {},
  } = projectDonationData ?? {};

  const { t } = useTranslation();
  const countryName = useCountryCodeToLocaleCountryName({
    country_code: country_code_project ?? country_code_projectDonation,
  });
  const [isHovered, setIsHovered] = useState(false);
  const formattedAmount = useAmountToFormatCurrency({
    amount: amount_raised ?? amount,
  });

  return (
    <Card
      width="100%"
      variant="unstyled"
      as={Link}
      href={`/project/${project_id_project ?? project_id_projectDonation}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardBody width="100%" padding={0}>
        <Box
          bgImage={`url(${image_url_project ?? image_url_projectDonation})`}
          bgSize={isHovered ? "110%" : "100%"}
          bgRepeat="repeat"
          bgPosition="center"
          height="11rem"
          transition="background-size 0.2s"
        />

        <Flex padding="0.75rem 0.5rem" gap="0.5rem" flexDir="column">
          <Flex flexDirection="column">
            <Heading fontSize="1.125rem" fontWeight="bold">
              {title_project ?? title_projectDonation}
            </Heading>
            <Text fontSize="0.875rem" fontWeight="medium" color="gray">
              {countryName}
            </Text>
          </Flex>

          <Flex flexDir="column" gap="0.25rem">
            {projectData && (
              <Progress
                width="100%"
                value={CalculatePercentage({
                  numerator: amount_raised,
                  denominator: amount_required,
                })}
              />
            )}

            <Flex gap="0.25rem" fontWeight="semibold" fontSize="1rem">
              <Text fontWeight="semibold">{formattedAmount}</Text>
              {projectDonationData && <Text>‧</Text>}
              <Text color={projectData ? "black" : "gray"} fontWeight="medium">
                {projectData
                  ? t("projectCardRaised")
                  : FormatTimeAgo({ timestamp: created_at })}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
