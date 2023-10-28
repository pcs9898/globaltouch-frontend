import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "@/src/commons/libraries/recoil/auth.recoil";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import { IQuery } from "@/src/commons/types/generated/types";
import { FETCH_USER_LOGGED_IN_QUERY } from "@/src/components/pages/signIn/signIn.quries";
import { useApolloClient } from "@apollo/client";
import { Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import SignGooglePresenter from "../../templates/signGoogle/signGoogle.presenter";

export default function SignGoogleContainer() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const client = useApolloClient();
  const setUserState = useSetRecoilState(userState);
  const router = useRouter();
  const restoreAccessToken = useRecoilValueLoadable(restoreAccessTokenLoadable);
  const toast = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    void restoreAccessToken.toPromise().then((newAccessToken) => {
      setAccessToken(newAccessToken);

      try {
        const fetchUserLoggedIn = async () => {
          const { data, error } = await client.query<
            Pick<IQuery, "fetchUserLoggedIn">
          >({
            query: FETCH_USER_LOGGED_IN_QUERY,
            context: {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            },
          });

          const {
            fetchUserLoggedIn: { name, user_id, profile_image_url },
          } = data;

          setUserState({
            name,
            profile_image_url,
            user_id,
          });

          toast({
            status: "success",
            title: t("signPageSignUpToastGreeting") + ` ${name}`,
          });

          router.push("/");
        };

        fetchUserLoggedIn();
      } catch (error) {
        console.error("Error fetching user logged in:", error);
      }
    });
  }, []);

  return <SignGooglePresenter />;
}
