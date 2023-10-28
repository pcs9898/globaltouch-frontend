import { RecoilEnv, atom, selector } from "recoil";
import { getAccessToken } from "../apollo/getAccessToken";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const restoreAccessTokenLoadable = selector({
  key: "restoreAccessTokenLoadable",
  get: async () => {
    const refreshTokenFromCookie = Cookie.get("refreshToken");
    if (refreshTokenFromCookie) {
      const newAccessToken = await getAccessToken();

      return newAccessToken;
      // }
    }
  },
});
