import { Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

interface IEndMessageProps {
  endMessageOptions: "project" | "donationHistory" | "comment";
}

export default function EndMessage({ endMessageOptions }: IEndMessageProps) {
  const { t } = useTranslation();

  return (
    <Flex w="100%" justifyContent="center" p="3rem">
      <Text fontSize="1.25rem" fontWeight="semibold" color="gray">
        {endMessageOptions === "comment"
          ? "No more comments"
          : t(
              `${
                endMessageOptions === "project"
                  ? "endMessageTextForProject"
                  : "endMessageTextForDonationHistory"
              }`
            )}
      </Text>
    </Flex>
  );
}
