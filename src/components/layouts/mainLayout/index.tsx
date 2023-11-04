import { Box, Container, calc } from "@chakra-ui/react";
import { ReactNode } from "react";
import SectionLayout from "./sectionLayout";
import { useRouter } from "next/router";

interface IMainLayout {
  children: ReactNode;
}

export default function MainLayout({ children }: IMainLayout) {
  const { pathname } = useRouter();

  const isFullLayout =
    pathname === "/signIn" ||
    pathname === "/signUp" ||
    pathname === "/" ||
    /^\/country\/[^/]+$/.test(pathname) ||
    /^\/project\/[^/]+$/.test(pathname);

  const isSignLayout = pathname === "/signIn" || pathname === "/signUp";

  return (
    <Container
      as="main"
      w="100%"
      maxW={isFullLayout ? "full" : "71.875rem"}
      m={0}
      p={0}
      pt={isSignLayout ? "0px" : { base: "3.5rem", md: "5rem" }}
    >
      <SectionLayout>{children}</SectionLayout>
    </Container>
  );
}
