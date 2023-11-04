import { useRouter } from "next/router";
import Header from "../../organisms/header";
import { Box, Container, Flex } from "@chakra-ui/react";

export default function HeaderLayout() {
  const { pathname } = useRouter();
  const isHomeLayout =
    pathname === "/" || pathname === "/country/[countryCode]";

  return (
    <Flex
      as="header"
      w="100%"
      maxW={isHomeLayout ? "full" : "71.875rem"}
      m="0px"
      p="0px"
      position="fixed"
      left={["50%", null, null, null]} // Centering view when fix
      transform={["translateX(-50%)", null, null, null]} // Centering view when
      top="0px"
      bg="white"
      zIndex={2}
      shadow={isHomeLayout ? "base" : "none"}
      borderRadius="0px"
    >
      <Header />
    </Flex>
  );
}
