import { defineConfig } from "freestyle-sh";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  dev: {
    command: "npm run dev",
    proxy: "http://localhost:3000",
  },
  deploy: {

    web: {
      entryPoint: ".next/standalone/entry.js",
    },
  },
});
