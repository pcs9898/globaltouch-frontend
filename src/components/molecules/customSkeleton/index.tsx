import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";

interface ICustomSkeletonProps {
  skeletonType: "projectCard" | "donationCard" | "tab" | "profile";
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
        <Flex gap="1rem">
          <SkeletonCircle w="4.25rem" h="4.25rem" />
          <Flex
            flexDir="column"
            w="calc(100% - 5.25rem)"
            h="100%"
            gap="0.25rem"
          >
            <Skeleton w="50%" h="100%" />
            <Skeleton w="20%" h="100%" />
          </Flex>
        </Flex>
      );

    default:
      return <div>hi</div>;
  }
}
