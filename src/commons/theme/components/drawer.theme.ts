import { drawerAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {
    borderRadius: "0",
    // transitionDuration: "0s",
    transition: "none",
  },
  dialog: {
    borderRadius: "0",
    // transitionDuration: "0s",
    transition: "none",
  },
});

export const drawerTheme = defineMultiStyleConfig({
  baseStyle,
});
