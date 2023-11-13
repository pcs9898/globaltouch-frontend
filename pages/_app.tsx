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
import Layouts from "@/src/components/layouts/index";
import "../src/commons/styles/styles.css";

import ApolloSetting from "@/src/commons/libraries/apollo/apolloSetting";
import Head from "next/head.js";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  if (process.env.NODE_ENV !== "production") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  useEffect(() => {
    const preferredLocale = Cookies.get("locale");

    if (preferredLocale) {
      router.push(router.pathname, router.asPath, {
        locale: preferredLocale,
      });
    } else {
      Cookies.set("locale", router.locale);
    }
  }, []);

  return (
    <>
      <Head>
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_GOOGLE_STORAGE_IMAGE_URL}/favicon.ico`}
        />
      </Head>
      <ChakraProvider theme={customTheme}>
        <RecoilRoot>
          <ApolloSetting>
            <ColorModeScript
              initialColorMode={chakraColorModeConfig.initialColorMode}
            />
            <Layouts>
              <Component {...pageProps} />
            </Layouts>
          </ApolloSetting>
        </RecoilRoot>
      </ChakraProvider>
    </>
  );
};

export default appWithTranslation(App, nextI18NextConfig);
