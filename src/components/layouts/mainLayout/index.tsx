import { Box, Container } from "@chakra-ui/react";
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
    pathname === "/updateCountryCode" ||
    pathname === "/" ||
    /^\/country\/[^/]+$/.test(pathname) ||
    /^\/project\/[^/]+$/.test(pathname);

  return (
    <Container
      as="main"
      w="100%"
      maxW={isFullLayout ? "full" : "container.md"}
      m={0}
      p={0}
    >
      <SectionLayout>{children}</SectionLayout>
    </Container>
  );
}
