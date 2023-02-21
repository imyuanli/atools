import {defineConfig} from "umi";

export default defineConfig({
    npmClient: "yarn",
    tailwindcss: {},
    plugins: ["@umijs/plugins/dist/tailwindcss"],
    theme: {
        "@primary-color": '#13c2c2',
        "@link-color": "#13c2c2"
    }
})
