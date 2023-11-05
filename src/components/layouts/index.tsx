import { useRouter } from "next/router";

import { ReactNode } from "react";
import HeaderLayout from "./headerLayout";
import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import FooterLayout from "./footerLayout";
import MainLayout from "./mainLayout";

interface ILayouts {
  children: ReactNode;
}

const pageListNeedFooter = [
  "signIn",
  "signUp",
  "about",
  "api",
  "blog",
  "for-charities",
  "help-center",
  "how-it-works",
  "jobs",
  "locations",
  "privacy",
  "terms",
];

export default function Layouts({ children }: ILayouts) {
  const { pathname } = useRouter();

  const isSignLayout = pathname === "/signIn" || pathname === "/signUp";

  const isHomeLayout =
    pathname === "/" || pathname === "/country/[countryCode]";

  const isSignGoogleNPaymentCompleteLayout =
    pathname === "/sign-google" || pathname === "/payment/complete";

  const isNeedFooterLayout = pageListNeedFooter.some(
    (item) => pathname === `/${item}`
  );

  return isSignGoogleNPaymentCompleteLayout ? (
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
      px={{
        base: isSignLayout || isHomeLayout ? "0" : "1rem",
        md: isSignLayout || isHomeLayout ? "0" : "1rem",
      }}
      centerContent
    >
      {!isSignLayout && <HeaderLayout />}
      <MainLayout>{children}</MainLayout>
      {isSignLayout && <FooterLayout />}
    </Container>
  );
}
