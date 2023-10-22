import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {
    borderRadius: "0",
  },
  dialog: {
    // borderRadius: "0",
  },
  dialogContainer: {
    borderRadius: "0",
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
