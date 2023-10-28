import { atom } from "recoil";
import { IRecoilUser } from "../../types/globalTypes";

export const userState = atom<IRecoilUser | null>({
  key: "userState",
  default: null,
});
