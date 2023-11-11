import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateUserArgs,
  IQuery,
} from "@/src/commons/types/generated/types";
import { useMoveToPage } from "../../customhooks/useMoveToPage";
import { useToast } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { accessTokenState } from "@/src/commons/libraries/recoil/auth.recoil";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import { FETCH_USER_LOGGED_IN_QUERY } from "../signIn/signIn.queries";
import { SIGN_UP_MUTATION } from "./signUp.queries";
import { useState } from "react";
import SignUpPresenter from "../../templates/signUp/signup.presenert";

export default function SignUpContainer() {
  const client = useApolloClient();
  const [signUpMutation, { loading: signUpMutationLoading }] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(SIGN_UP_MUTATION);
  const router = useRouter();
  const toast = useToast();
  const setAccessToken = useSetRecoilState(accessTokenState);
  const { t } = useTranslation();
  const setUserState = useSetRecoilState(userState);
  const [signUpLoading, setSignUpLoading] = useState(false);

  const onSignUpSubmit = async (data) => {
    const { email, name, password } = data;

    setSignUpLoading(true);
    try {
      const result = await signUpMutation({
        variables: {
          createUserDTO: {
            email,
            name,
            password,
          },
        },
      });

      const accessToken = result.data.createUser.accessToken;

      if (accessToken) {
        setAccessToken(accessToken);

        const { data } = await client.query<Pick<IQuery, "fetchUserLoggedIn">>({
          query: FETCH_USER_LOGGED_IN_QUERY,
          context: {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        });

        const { name, profile_image_url, user_id } = data.fetchUserLoggedIn;

        setUserState({
          name,
          profile_image_url,
          user_id,
        });

        toast({
          status: "success",
          title: t("signPageSignUpToastGreeting") + ` ${name}`,
        });

        void router.push("/");
        setSignUpLoading(false);
      }
    } catch (error) {
      setSignUpLoading(false);
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
    <SignUpPresenter
      onSignUpSubmit={onSignUpSubmit}
      signUpLoading={signUpLoading}
      onSignGoogle={onSignGoogle}
    />
  );
}
