import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";

import {
  IMutation,
  IMutationLoginUserArgs,
  IQuery,
} from "@/src/commons/types/generated/types";
import { useSetRecoilState } from "recoil";
import { accessTokenState } from "@/src/commons/libraries/recoil/auth.recoil";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMoveToPage } from "../../customhooks/useMoveToPage";
import { useTranslation } from "next-i18next";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import { FETCH_USER_LOGGED_IN_QUERY, SIGN_IN_MUTATION } from "./signIn.queries";
import { useState } from "react";
import SignInPresenter from "../../templates/signIn/signIn.presenert";

export default function SignInContainer() {
  const client = useApolloClient();
  const [signInMutation, { loading: signInMutationLoading }] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(SIGN_IN_MUTATION);
  const setAccessToken = useSetRecoilState(accessTokenState);
  const toast = useToast();
  const router = useRouter();
  const { t } = useTranslation();
  const setUserState = useSetRecoilState(userState);
  const [signInLoading, setSignInLoading] = useState(false);

  const onSignInSubmit = async (data) => {
    const { email, password } = data;

    setSignInLoading(true);
    try {
      const result = await signInMutation({
        variables: {
          loginDTO: {
            email,
            password,
          },
        },
      });

      const accessToken = result.data.loginUser;

      if (accessToken) {
        setAccessToken(accessToken);

        const { data, error } = await client.query<
          Pick<IQuery, "fetchUserLoggedIn">
        >({
          query: FETCH_USER_LOGGED_IN_QUERY,
          context: {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        });

        const { name, profile_image_url, user_id } = data.fetchUserLoggedIn;

        console.log("hi");
        console.log(name);
        setUserState({
          name,
          profile_image_url,
          user_id,
        });

        toast({
          status: "success",
          title: t("signPageSignInToastGreeting") + ` ${name}`,
        });

        void router.push("/");
        setSignInLoading(false);
      }
    } catch (error) {
      setSignInLoading(false);
      toast({
        status: "error",
        title: error.message,
      });
    }
  };

  const onSignGoogle = async () => {
    router.push(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SIGN);
  };

  return (
    <SignInPresenter
      onSignInSubmit={onSignInSubmit}
      onSignGoogle={onSignGoogle}
      signInLoading={signInLoading}
    />
  );
}
