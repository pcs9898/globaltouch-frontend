import { useRouter } from "next/router";
import Header from "../../organisms/header";
import { Box, Container } from "@chakra-ui/react";

export default function HeaderLayout() {
  const { pathname } = useRouter();
  const isHomeLayout =
    pathname === "/" || pathname === "/country/[countryCode]";

  return (
    <Box
      as="header"
      w="100%"
      m="0px"
      p="0px"
      position="fixed"
      left="0px"
      top="0px"
      bg="white"
      zIndex={2}
      shadow={isHomeLayout ? "base" : "none"}
      borderRadius="0px"
    >
      <Header />
    </Box>
  );
}
