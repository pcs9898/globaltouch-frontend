import { Flex, useColorMode } from "@chakra-ui/react";
import PulseLoader from "react-spinners/PulseLoader";

export default function MapMarkerLoader() {
  const { colorMode } = useColorMode();
  return (
    <Flex
      position="absolute"
      top="2rem"
      left="50%"
      transform="translate(-50%, -50%)"
      height="2.5rem"
      bgColor={colorMode === "light" ? "white" : "gray.700"}
      justifyContent="center"
      alignItems="center"
      w="4rem"
      border="0"
      shadow="lg"
    >
      <PulseLoader color="#319795" size="0.75rem" />
    </Flex>
  );
}
