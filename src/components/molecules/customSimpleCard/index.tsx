import { IProject } from "@/src/commons/types/generated/types";
import { Box, Card, CardBody, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

interface ICustomSimpleCardProps {
  project: IProject;
}

export default function CustomSimpleCard({ project }: ICustomSimpleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      h="min-content"
      width="100%"
      variant="unstyled"
      as={Link}
      href={`/project/${project?.project_id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bgColor={isHovered ? "gray.100" : "null"}
      style={{
        transition: "all 0.1s ease-in-out",
      }}
    >
      <CardBody width="100%" h="100%" padding={0}>
        <Box
          bgImage={`url(${project?.projectImages
            .filter((image) => image.image_index === 0)
            .map((image) => image.image_url)})`}
          bgSize={isHovered ? "110%" : "cover"}
          // bgRepeat="repeat"
          bgPosition="center"
          aspectRatio={20 / 9}
          style={{
            transition: "all 3s ease-in-out",
          }}
        />

        <Flex padding="0.75rem 0.5rem" gap="0.5rem" flexDir="column">
          <Heading fontSize="1rem" fontWeight="bold">
            {project.title}
          </Heading>
        </Flex>
      </CardBody>
    </Card>
  );
}
