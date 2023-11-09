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
  IProject,
  IProjectDonation,
} from "@/src/commons/types/generated/types";
import { useFormatTimeAgo } from "../../customhooks/useFormatTimgAgo";

interface ICustomCard {
  project?: IProject;
  donation?: IProjectDonation;
}

export default function CustomCard({ project, donation }: ICustomCard) {
  const { t } = useTranslation();
  const countryName = useCountryCodeToLocaleCountryName({
    country_code:
      project?.countryCode.country_code ??
      donation?.project.countryCode.country_code,
  });
  const [isHovered, setIsHovered] = useState(false);
  const formattedAmount = useAmountToFormatCurrency({
    amount: project?.amount_raised ?? donation?.amount,
  });
  const formatCreatedAt = useFormatTimeAgo({ timestamp: donation?.created_at });

  return (
    (project || donation) && (
      <Card
        width="100%"
        variant="unstyled"
        as={Link}
        height="100%"
        href={`/project/${project?.project_id ?? donation?.project.project_id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        bgColor={isHovered ? "gray.100" : "null"}
        style={{
          transition: "all 0.3s ease-in-out",
        }}
        shadow="none"
      >
        <CardBody width="100%" padding={0}>
          <Box
            aspectRatio={{ base: "18/9", md: "2 / 1" }}
            overflow="hidden"
            p="0"
          >
            {/* <Image
              alt="project image"
              src={
                project?.projectImages
                  .filter((image) => image.image_index === 0)
                  .map((image) => image.image_url) ??
                donation.project.projectImages
                  .filter((image) => image.image_index === 0)
                  .map((image) => image.image_url)
              }
              w="100%"
              h="100%"
              bgSize="cover"
              bgPosition="center"
              style={{
                transition: "all 0.1s ease-in-out",
                transform: isHovered ? "scale(1.1)" : "none",
              }}
            /> */}
            <Box
              bgImage={`url(${
                project?.projectImages
                  .filter((image) => image.image_index === 0)
                  .map((image) => image.image_url) ??
                donation.project.projectImages
                  .filter((image) => image.image_index === 0)
                  .map((image) => image.image_url)
              })`}
              aspectRatio={{ base: "2 / 1", md: "2 / 1" }}
              bgSize="cover"
              bgPosition="center"
              style={{
                transition: "all 0.3s ease-in-out",
                transform: isHovered ? "scale(1.1)" : "none",
              }}
              overflow="hidden"
            />
          </Box>

          <Flex padding="0.75rem 0.5rem" gap="0.5rem" flexDir="column">
            <Flex flexDirection="column">
              <Heading fontSize="1rem" fontWeight="bold">
                {project?.title ?? donation?.project.title}
              </Heading>
              <Text fontSize="0.875rem" fontWeight="medium" color="gray">
                {countryName} &bull;{" "}
                {project?.cityName ?? donation?.project.cityName}
              </Text>
            </Flex>

            <Flex flexDir="column" gap="0.25rem">
              {project && (
                <Progress
                  width="100%"
                  value={CalculatePercentage({
                    numerator: project.amount_raised,
                    denominator: project.amount_required,
                  })}
                />
              )}

              <Flex gap="0.25rem" fontWeight="semibold" fontSize="1rem">
                {formattedAmount && (
                  <Text fontWeight="semibold">{formattedAmount}</Text>
                )}
                {donation && <Text>‧</Text>}
                <Text color={project ? "black" : "gray"} fontWeight="medium">
                  {project ? t("projectCardRaised") : formatCreatedAt}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    )
  );
}
