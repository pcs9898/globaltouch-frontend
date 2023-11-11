import { IProject } from "@/src/commons/types/generated/types";

export interface IHoveredMarker {
  project: IProject;
  position: {
    lat: number;
    lng: number;
  };
}

export interface ISelectedMarker {
  project: IProject;
  position: {
    lat: number;
    lng: number;
  };
}
