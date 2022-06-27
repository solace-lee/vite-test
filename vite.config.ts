import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// import { getThemeVariables } from 'antd/dist/theme';

// https://vitejs.dev/config/
export default config => {
  return defineConfig({
    server: {
      https: false,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    plugins: [react()],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  });
};
