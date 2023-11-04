import { Box, Container, Flex } from "@chakra-ui/react";
import Footer from "../../organisms/footer/footer";
import { useRouter } from "next/router";

const pageListNeedFooterWithoutFixed = [
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

export default function FooterLayout() {
  const router = useRouter();
  const isNeedWithoutFixedFooter = pageListNeedFooterWithoutFixed.some(
    (item) => router.pathname === `/${item}`
  );

  const isSignLayout =
    router.pathname === "/signIn" || router.pathname === "/signUp";

  return (
    <Box
      as="footer"
      position={isNeedWithoutFixedFooter ? null : "fixed"}
      maxW={isSignLayout ? "full" : "71.875rem"}
      bottom="0"
      left="0"
      w="100vw"
      display="flex"
      justifyContent="center"
      shadow={isSignLayout ? "base" : "none"}
    >
      <Footer />
    </Box>
  );
}
