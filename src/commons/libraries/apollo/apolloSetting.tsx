import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "../recoil/auth.recoil";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  fromPromise,
  useApolloClient,
} from "@apollo/client";
import { useEffect } from "react";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "./getAccessToken";
import { createUploadLink } from "apollo-upload-client";
import Cookie from "js-cookie";
import { IQuery } from "../../types/generated/types";
import { FETCH_USER_LOGGED_IN_QUERY } from "@/src/components/pages/signIn/signIn.queries";
import { userState } from "../recoil/global.recoil";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const GLOBAL_STATE = new InMemoryCache({});

export default function ApolloSetting(props) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const restoreAccessToken = useRecoilValueLoadable(restoreAccessTokenLoadable);
  const setUserState = useSetRecoilState(userState);
  const toast = useToast();
  const { t } = useTranslation();
  const router = useRouter();
  console.log("hi2");
  useEffect(() => {
    console.log("hi");
    // const refreshTokenFromCookie = Cookie.get("refreshToken");
    // if (refreshTokenFromCookie) {
    //   void restoreAccessToken.toPromise().then((newAccessToken) => {
    //     setAccessToken(newAccessToken);

    //     const fetchUserLoggedIn = async () => {
    //       const { data } = await apolloClient.query<
    //         Pick<IQuery, "fetchUserLoggedIn">
    //       >({
    //         query: FETCH_USER_LOGGED_IN_QUERY,
    //         context: {
    //           headers: {
    //             Authorization: `Bearer ${newAccessToken}`,
    //           },
    //         },
    //       });

    //       const { name, profile_image_url, user_id } = data.fetchUserLoggedIn;

    //       setUserState({
    //         name,
    //         profile_image_url,
    //         user_id,
    //       });

    //       if (window.history.state.url !== "/payment/complete") {
    //         toast({
    //           status: "success",
    //           title: t("signPageSignInToastGreeting") + ` ${name}`,
    //         });
    //       }
    //     };
    //     fetchUserLoggedIn();
    //   });
    // }
    // }
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken);

              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
            })
          ).flatMap(() => forward(operation));
        } else {
          console.log(err);
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URI,
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const apolloClient = new ApolloClient({
    link: ApolloLink.from([
      errorLink,
      // authLink,
      uploadLink as unknown as ApolloLink,
    ]),
    // uri: process.env.NEXT_PUBLIC_BACKEND_URI,
    cache: GLOBAL_STATE,
    connectToDevTools: true,
  });

  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
}
