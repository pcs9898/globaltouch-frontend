import { ni18nConfig } from "@/ni18n.config";
import client from "@/src/commons/libraries/apollo/apollo";
import { customTheme } from "@/src/commons/theme";
import chakraColorModeConfig from "@/src/commons/theme/config.theme";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { appWithI18Next, useSyncLanguage } from "ni18n";
import { RecoilRoot } from "recoil";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useEffect } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  const locale =
    typeof window !== "undefined" && window.localStorage.getItem("language");

  useSyncLanguage(locale);

  return (
    <ChakraProvider theme={customTheme}>
      <RecoilRoot>
        <ApolloProvider client={client}>
          <ColorModeScript
            initialColorMode={chakraColorModeConfig.initialColorMode}
          />
          <Component {...pageProps} />
        </ApolloProvider>
      </RecoilRoot>
    </ChakraProvider>
  );
};

export default appWithI18Next(App, ni18nConfig);
