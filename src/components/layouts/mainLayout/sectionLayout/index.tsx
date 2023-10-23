import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ISectionLayout {
  children: ReactNode;
}

export default function SectionLayout({ children }: ISectionLayout) {
  return (
    <Box as="section" w="100%" m="0">
      {children}
    </Box>
  );
}
