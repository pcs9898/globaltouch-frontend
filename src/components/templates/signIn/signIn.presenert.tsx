import { Box, Flex, useColorMode } from "@chakra-ui/react";
import SignForm from "../../molecules/signForm";
import SignGreetingSection from "../../molecules/signGreetingSection";
import { ISignInPresenter } from "./signIn.types";

export default function SignInPresenter({
  onSignInSubmit,
  onSignGoogle,
  signInLoading,
}: ISignInPresenter) {
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      w="100vw"
      h="100vh"
      justifyContent={{ md: "center" }}
      alignItems={{ md: "center" }}
      bgColor={{ md: colorMode === "light" ? "#FBF8F6" : "#1a202c" }}
      borderRadius="0px"
      pb={{ base: "5.5rem", md: "0px" }}
    >
      <Box
        w={{ md: "40%" }}
        h={{ base: "40%", md: "100%" }}
        px={{ base: "1rem", md: "3rem" }}
        display="flex"
        justifyContent="center"
        alignItems={{ base: "flex-end", md: "center" }}
        pb={{ base: "2rem", md: "0px" }}
      >
        <SignGreetingSection signGreetingSectionOption="signIn" />
      </Box>
      <Flex
        w={{ md: "60%" }}
        p="2rem"
        px={{ base: "1rem", md: "3rem" }}
        shadow={{ md: "base" }}
        h={{ base: "60%", md: "100%" }}
        borderRadius="0px"
        borderTopLeftRadius="50px"
        bgColor={colorMode === "light" ? "white" : "gray.700"}
        justifyContent="center"
        alignItems={{ base: "flex-start", md: "center" }}
      >
        <SignForm
          onSignInSubmit={onSignInSubmit}
          onSignGoogle={onSignGoogle}
          isBtnLoading={signInLoading}
        />
      </Flex>
    </Flex>
  );
}
