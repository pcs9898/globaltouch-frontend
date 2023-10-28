import { Box, Container, Flex } from "@chakra-ui/react";
import Footer from "../../organisms/footer/footer";

export default function FooterLayout() {
  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      left="0"
      w="100vw"
      display="flex"
      justifyContent="center"
    >
      <Footer />
    </Box>
  );
}
