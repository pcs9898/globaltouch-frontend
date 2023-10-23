import Header from "../../organisms/header";
import { Box, Container } from "@chakra-ui/react";

export default function HeaderLayout() {
  return (
    <Box as="header" w="100%" m="0px" p="0px">
      <Header />
    </Box>
  );
}
