import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const projectRootDir = path.resolve(__dirname);

export default () => {
    return defineConfig({
        base: "./",
        plugins: [react()],
        resolve: {
            alias: [
                {
                    // this is required for the SCSS modules
                    find: /^~(.*)$/,
                    replacement: "$1",
                }
            ],
        },
        server: {
            port: 5183,
        },
    });
};
