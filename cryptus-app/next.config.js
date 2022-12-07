const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  // next.js config
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
