import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import SectionLayout from "./sectionLayout";
import { useRouter } from "next/router";

interface IMainLayout {
  children: ReactNode;
}

export default function MainLayout({ children }: IMainLayout) {
  const { pathname } = useRouter();

  const isCenterLayout = pathname === "/search" || pathname === "/me";

  return (
    <Container
      as="main"
      w="100%"
      maxW={isCenterLayout ? "container.md" : "full"}
      m={0}
      p={0}
    >
      <SectionLayout>{children}</SectionLayout>
    </Container>
  );
}
