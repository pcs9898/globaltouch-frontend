import {
  Box,
  Card,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";

interface ICustomSkeletonProps {
  skeletonType:
    | "projectCard"
    | "donationCard"
    | "tab"
    | "profile"
    | "projectDetail"
    | "projectDetailAsideCard";
  tabOptions?: "tabFlexStart" | "tabCenter";
}

export default function CustomSkeleton({
  skeletonType,
  tabOptions,
}: ICustomSkeletonProps) {
  switch (skeletonType) {
    case "projectCard":
    case "donationCard":
      return (
        <Box width="100%">
          <Skeleton height="11rem" />
          <Flex
            padding="0.75rem 0.5rem"
            gap="0.75rem"
            flexDir="column"
            width="100%"
          >
            <Flex flexDir="column" gap="0.25rem">
              <Skeleton height="1rem" width="80%" />
              <Skeleton height="0.75rem" width="35%" />
            </Flex>
            <Flex width="100%" flexDir="column" gap="0.25rem">
              {skeletonType === "projectCard" && <Skeleton height="0.75rem" />}
              <Skeleton height="0.75rem" width="35%" />
            </Flex>
          </Flex>
        </Box>
      );

    case "tab":
      return (
        <Tabs
          height="2.5rem"
          variant="unstyled"
          display="flex"
          justifyContent={
            tabOptions === "tabFlexStart" ? "flex-start" : "center"
          }
          overflow="clip"
        >
          <TabList height="100%" gap="0.5rem">
            {Array.from(
              { length: tabOptions === "tabCenter" ? 3 : 6 },
              (_, i) => (
                <Tab key={i} padding="0" margin="0" bg="0">
                  <Skeleton height="100%" width="5rem" />
                </Tab>
              )
            )}
          </TabList>
        </Tabs>
      );
    case "profile":
      return (
        <Flex gap="1rem" w="100%">
          <SkeletonCircle w="4.25rem" h="4.25rem" />

          <Flex w="calc(100% - 4.25rem)" flexDir="column" gap="0.5rem">
            <Skeleton w="35%" h="40%" />
            <Skeleton w="15%" h="40%" />
          </Flex>
        </Flex>
      );

    case "projectDetail":
      return (
        <Box width="100%">
          <Skeleton height="40vh" borderRadius={{ base: "0px", md: "12px" }} />
          <Flex
            padding="0.75rem 0.5rem"
            gap="1rem"
            flexDir="column"
            width="100%"
          >
            <Flex flexDir="column" gap="1rem">
              <Skeleton height="2rem" width="80%" />
              <Skeleton height="1rem" width="35%" />
              <Skeleton height="1rem" width="100%" />
              <Skeleton height="1rem" width="35%" />
              <Skeleton height="1rem" width="35%" />
            </Flex>
            <Divider />
            <Flex flexDir="column" gap="1rem">
              <Skeleton height="1.5rem" width="30%" />
              <Skeleton height="1rem" width="50%" />
            </Flex>
            <Divider />
            <Flex flexDir="column" gap="1rem">
              <Skeleton height="1.5rem" width="30%" />
              <Skeleton height="1rem" width="100%" />
              <Skeleton height="1rem" width="100%" />
              <Skeleton height="1rem" width="100%" />
              <Skeleton height="1rem" width="100%" />
              <Skeleton height="1rem" width="100%" />
              <Skeleton height="1rem" width="100%" />D
            </Flex>
          </Flex>
        </Box>
      );

    case "projectDetailAsideCard":
      return (
        <Flex w="100%" gap="1rem" flexDir="column">
          <Skeleton height="1.5rem" width="40%" />
          <Skeleton height="1rem" width="100%" />
          <Skeleton height="1rem" width="100%" />
          <Skeleton height="1rem" width="70%" />
          <Flex gap="0.5rem" flexDir="column">
            <Skeleton height="2rem" width="100%" />
            <Skeleton height="2rem" width="100%" />
          </Flex>
        </Flex>
      );

    default:
      return <div>hi</div>;
  }
}
