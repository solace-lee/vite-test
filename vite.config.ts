import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
// import { getThemeVariables } from 'antd/dist/theme';
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default (config) => {
  return defineConfig({
    server: {
      https: false,
      // proxy: {
      //   'localhost:20009': {
      //     target: 'cleanown.cn:20009',
      //     changeOrigin: true,
      //     rewrite: path => path.replace('localhost:20009', 'cleanown.cn:20009')
      //   }
      // },
    },
    resolve: {
      alias: {
        "@src": resolve(__dirname, "./src"),
        "@cornerstonejs/core": resolve(__dirname, "./src/utils/core/src"),
        "@cornerstonejs/tools": resolve(__dirname, "./src/utils/tools/src"),
        "@cornerstonejs/streaming-image-volume-loader": resolve(__dirname, "./src/utils/streaming-image-volume-loader/src")
      },
    },
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
      }),
      react(),
      tsconfigPaths()
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  });
};
