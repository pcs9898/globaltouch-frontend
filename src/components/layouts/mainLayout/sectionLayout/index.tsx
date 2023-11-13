import FooterForStatic from "@/src/components/organisms/footerForStatic";
import { Box, Container } from "@chakra-ui/react";
import { kMaxLength } from "buffer";
import { clearIndexedDbPersistence } from "firebase/firestore";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface ISectionLayout {
  children: ReactNode;
}

const staticPagesNeedFooter = [
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

export default function SectionLayout({ children }: ISectionLayout) {
  // const { pathname } = useRouter();
  // const isNeedFooterLayout = staticPagesNeedFooter.some(
  //   (item) => pathname === `/${item}`
  // );

  return (
    <Box as="section" w="100%" m="0" pb={{ base: "5.5rem", md: "0px" }}>
      {children}
    </Box>
  );
}
