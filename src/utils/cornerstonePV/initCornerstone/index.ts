import initProviders from "./initProviders";
import initCornerstoneWADOImageLoader from "./initCornerstoneWADOImageLoader";
import initVolumeLoader from "./initVolumeLoader";
import { init as csRenderInit } from "@cornerstonejs/core";
import { init as csToolsInit } from "@cornerstonejs/tools";

export default async function initPVstone() {
  initProviders();
  initCornerstoneWADOImageLoader({
    originPath: window.location.origin,
    authFunc: () => localStorage.getItem("token"),
  });
  initVolumeLoader();
  await csRenderInit();
  await csToolsInit();
}
