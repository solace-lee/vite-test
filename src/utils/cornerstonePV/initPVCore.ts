import * as cornerstone from "../core/src/index";
import { IStackViewport } from "../core/src/types";
// import * as cornerstone from '@cornerstonejs/core'
// import { IStackViewport } from "@cornerstonejs/core/dist/esm/types";
import dicomParser from "dicom-parser";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import { imageLoader, volumeLoader } from '../core/src/index';
// import {
//   cornerstoneStreamingImageVolumeLoader,
//   sharedArrayBufferImageLoader,
// // } from '@cornerstonejs/streaming-image-volume-loader';
// } from '../streaming-image-volume-loader/src/index';

interface initConfig {
  authFunc?: Function; // 获取需要加入Header的参数
  originPath?: String; // WADOImageLoader的worker依赖路径
}

// export default function initVolumeLoader() {
//   volumeLoader.registerUnknownVolumeLoader(
//     cornerstoneStreamingImageVolumeLoader
//   );
//   volumeLoader.registerVolumeLoader(
//     'cornerstoneStreamingImageVolume',
//     cornerstoneStreamingImageVolumeLoader
//   );

//   imageLoader.registerImageLoader(
//     'streaming-wadors',
//     sharedArrayBufferImageLoader
//   );
// }

async function initPVCore(initConfig: initConfig = {}) {
  if (window.cornerstonePV) {
    return window.cornerstonePV;
  }
  // initVolumeLoader()
  const { authFunc, originPath } = initConfig;
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneWADOImageLoader.configure({
    useWebWorkers: true,
    decodeConfig: {
      convertFloatPixelDataToInt: false,
    },
    beforeSend: (xhr: any) => {
      const keys = authFunc && authFunc();
      xhr.setRequestHeader(
        "pv-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJzZXNzOjRiM2YwNmY3LTRjMDQtNDI2My1hNzZhLWNiMmMyNzVkZTlmNyIsImlhdCI6MTY1NjA2NDc5NX0.QAFy29r0QR3jH_-v-ZkKUiWlxMXA9pzMd1EakOabctI"
      );
      xhr.setRequestHeader(
        "Cross-Origin-Embedder-Policy",
        "require-corp"
      );
      xhr.setRequestHeader(
        "Cross-Origin-Opener-Policy",
        "same-origin"
      );
    },
  });

  await cornerstone.init();

  const config = {
    webWorkerTaskPaths: [
      `${originPath}/WADOImageLoader/610.bundle.min.worker.js`,
      `${originPath}/WADOImageLoader/888.bundle.min.worker.js`,
    ],
    maxWebWorkers: navigator.hardwareConcurrency || 3,
    startWebWorkersOnDemand: false,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: false,
        strict: false,
      },
      sleepTask: {
        sleepTime: 3000,
      },
    },
  };

  cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
  window.cornerstonePV = cornerstone;
  return cornerstone;
}

export { initPVCore };
