import { useRouter } from "next/router";

import { ReactNode } from "react";
import HeaderLayout from "./headerLayout";
import { Container } from "@chakra-ui/react";
import FooterLayout from "./footerLayout";
import MainLayout from "./mainLayout";

interface ILayouts {
  children: ReactNode;
}

export default function Layouts({ children }: ILayouts) {
  const { pathname } = useRouter();

  const isSignLayout =
    pathname === "/signIn" ||
    pathname === "/signUp" ||
    pathname === "/updateCountryCode";

  const isHomeLayout =
    pathname === "/" || pathname === "/country/[countryCode]";

  return (
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
