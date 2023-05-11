import {defineConfig} from "umi";

export default defineConfig({
    npmClient: "yarn",
    tailwindcss: {},
    plugins: ["@umijs/plugins/dist/tailwindcss", "@umijs/plugins/dist/dva"],
    theme: {
        "@primary-color": "#b37feb",
        "@link-color": "#b37feb",
    },
    dva: {},
    codeSplitting: {
        jsStrategy: 'granularChunks'
    }
});
