/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    path: "/",

    // loader: "custom",
    // loaderFile: "./ImageLoader.js",
    disableStaticImages: true,
  },
};

module.exports = nextConfig;
