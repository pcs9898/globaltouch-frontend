import { useRouter } from "next/router";

import { ReactNode } from "react";
import HeaderLayout from "./headerLayout";
import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import FooterLayout from "./footerLayout";
import MainLayout from "./mainLayout";

interface ILayouts {
  children: ReactNode;
}

export default function Layouts({ children }: ILayouts) {
  const { pathname } = useRouter();

  const isSignLayout = pathname === "/signIn" || pathname === "/signUp";

  const isHomeLayout =
    pathname === "/" || pathname === "/country/[countryCode]";

  const isSignGoogleLayout = pathname === "/sign-google";

  return isSignGoogleLayout ? (
    <Flex
      as="main"
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Flex>
  ) : (
    <Container
      maxW={isSignLayout || isHomeLayout ? "full" : "71.875rem"}
      p="0"
      centerContent
    >
      {!isSignLayout && <HeaderLayout />}
      <MainLayout>{children}</MainLayout>
      {isSignLayout && <FooterLayout />}
    </Container>
  );
}
