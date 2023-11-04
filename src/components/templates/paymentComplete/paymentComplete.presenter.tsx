import { Box, Center, Spinner } from "@chakra-ui/react";

export default function PaymentCompletePresenter() {
  return (
    <Box w="100vw" h="100vh">
      <Center>
        <Spinner size="xl" colorScheme="teal" />
      </Center>
    </Box>
  );
}
