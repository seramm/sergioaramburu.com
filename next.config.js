const { i18n } = require("./next-i18next.config");
module.exports = {
  reactStrictMode: true,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n,
};
