const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) config.resolve.fallback.fs = false;
  //   return config;
  // },
});
