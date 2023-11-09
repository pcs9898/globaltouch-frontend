import { IProject } from "@/src/commons/types/generated/types";
import { Box, Card, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useCountryCodeToLocaleCountryName } from "../../customhooks/useCountryCodeToLocaleCountryName";
import { useRouter } from "next/router";

interface IRenderOverlayMdMapCardProps {
  project: IProject;
  position?: { lat: number; lng: number };
}

export default function OverlayMdMapCard({
  project,
}: IRenderOverlayMdMapCardProps) {
  const countryName = useCountryCodeToLocaleCountryName({
    country_code: project?.countryCode.country_code,
  });
  const router = useRouter();

  return (
    <Card
      zIndex={5}
      onClick={() => router.push(`/project/${project.project_id}`)}
      w="20rem"
      shadow="dark-lg"
      position="relative"
    >
      <Image
        aspectRatio={1.5 / 1}
        alt="project image"
        objectFit="cover"
        src={String(
          project?.projectImages
            .filter((image) => image.image_index === 0)
            .map((image) => image.image_url)
        )}
      />
      <Box
        position="absolute"
        top="45%"
        right="0"
        bottom="0"
        left="0"
        bgGradient="linear(to-t, black, transparent)"
      />

      <Flex
        position="absolute"
        padding="0.75rem 0.5rem"
        gap="0.5rem"
        flexDir="column"
        bottom="0"
        left="0"
        width="100%"
      >
        <Flex flexDirection="column" gap="0.25rem">
          <Text fontSize="0.875rem" fontWeight="semibold" color="gray.200">
            {countryName}
          </Text>

          <Heading
            fontSize="1rem"
            fontWeight="semibold"
            whiteSpace="normal"
            noOfLines={2}
            borderRadius="0px"
            color="white"
          >
            {project?.title}
          </Heading>
        </Flex>
      </Flex>
    </Card>
  );
}
