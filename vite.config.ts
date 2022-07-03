import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
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
        "@": resolve(__dirname, "./src/"),
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
