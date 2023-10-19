import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./globalStyles.theme";
import chakraColorModeConfig from "./config.theme";
import { colors } from "./colors.theme";
import { progressTheme } from "./components/progress.theme";
import { cardTheme } from "./components/card.theme";
import { skeletonTheme } from "./components/skeleton.theme";
import { tabsTheme } from "./components/tabs.theme";
import { buttonTheme } from "./components/button.theme";

export const customTheme = extendTheme({
  styles: globalStyles,
  config: chakraColorModeConfig,
  colors,
  components: {
    Progress: progressTheme,
    Card: cardTheme,
    Skeleton: skeletonTheme,
    Tabs: tabsTheme,
    Button: buttonTheme,
  },
});
