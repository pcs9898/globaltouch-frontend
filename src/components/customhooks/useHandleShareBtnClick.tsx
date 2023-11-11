import { useToast } from "@chakra-ui/react";

export const useHandleShareBtnClick = () => {
  const toast = useToast();

  return async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        status: "info",
        title: "Link copied!",
      });
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };
};
