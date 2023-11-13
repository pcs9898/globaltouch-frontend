import { ISelectedMarker } from "@/src/components/organisms/googleMap/googleMap.interface";
import { atom } from "recoil";

export const exSelectedMarkerState = atom<ISelectedMarker>({
  key: "exSelectedMarkerState",
  default: null,
});
