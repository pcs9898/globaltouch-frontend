import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

interface ISignGreetingSection {
  signGreetingSectionOption: "signIn" | "signUp";
}

export default function SignGreetingSection({
  signGreetingSectionOption,
}: ISignGreetingSection) {
  const { t } = useTranslation();

  return (
    <Flex
      flexDir="column"
      alignItems="flex-start"
      w={{ base: "100%", md: "max-content" }}
    >
      <Image src="logo.svg" alt="logo" w="1.5rem" />

      <Text
        paddingTop={{ base: "2.5rem", md: "5rem" }}
        pb="1.5rem"
        fontWeight="medium"
      >
        {t(
          `${
            signGreetingSectionOption === "signIn"
              ? "signInGreeting1"
              : "signUpGreeting1"
          }`
        )}
      </Text>
      <Text fontSize={["1.75rem", "1.75rem", "2.25rem"]} fontWeight="semibold">
        {t(
          `${
            signGreetingSectionOption === "signIn"
              ? "signInGreeting2"
              : "signUpGreeting2"
          }`
        )}
      </Text>
    </Flex>
  );
}
