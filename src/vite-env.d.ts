/// <reference types="vite/client" />

// declare module 'three'
declare module "cornerstone-wado-image-loader";
declare module "@/common";
declare module "@/utils/core/src/index" {
  import type Types from "@/utils/core/src/index";
  export type { Types };
}

declare module "dcmjs";

// declare module "@cornerstonejs/core" {
//   // import type Types from "@cornerstonejs/core/types";
//   import type Types from "@cornerstonejs/core/types";
//   export type { Types };
// }
