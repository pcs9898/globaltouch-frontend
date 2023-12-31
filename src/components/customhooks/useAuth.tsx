import { getAccessToken } from "@/src/commons/libraries/apollo/getAccessToken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "@/src/commons/libraries/recoil/auth.recoil";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import { useToast } from "@chakra-ui/react";

export default function useAuth() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const restoreAccessToken = useRecoilValueLoadable(restoreAccessTokenLoadable);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!accessToken) {
      void restoreAccessToken.toPromise().then((newAccessToken) => {
        if (newAccessToken === undefined) {
          toast({
            status: "info",
            title: "You should sign in first",
          });
          router.push("/signIn");
        }
      });
    }
  }, []);
}
