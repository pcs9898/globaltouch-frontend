import client from "@/src/commons/libraries/apollo/apollo";
import { customTheme } from "@/src/commons/theme";
import chakraColorModeConfig from "@/src/commons/theme/config.theme";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { RecoilRoot } from "recoil";
import nextI18NextConfig from "../next-i18next.config.js";
import { useEffect } from "react";
import { useRouter } from "next/router.js";
import Cookies from "js-cookie";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  // const preferredLocale = Cookies.get("locale");

  // if (preferredLocale) {
  //   router.push(router.pathname, router.asPath, {
  //     locale: preferredLocale,
  //   });
  // }

  useEffect(() => {
    const preferredLocale = Cookies.get("locale");

    if (preferredLocale) {
      router.push(router.pathname, router.asPath, {
        locale: preferredLocale,
      });
    }
  }, []);

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

export default appWithTranslation(App, nextI18NextConfig);
