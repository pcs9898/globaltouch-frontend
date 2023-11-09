import { Flex } from "@chakra-ui/react";
import PulseLoader from "react-spinners/PulseLoader";

export default function MapMarkerLoader() {
  return (
    <Flex
      position="absolute"
      top="2rem"
      left="50%"
      transform="translate(-50%, -50%)"
      height="2.5rem" // 높이를 원하는 값으로 조절하세요.
      bgColor="white"
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
