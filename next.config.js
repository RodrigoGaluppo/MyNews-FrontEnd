const withPWA = require("next-pwa")

module.exports = withPWA({
  pwa:{
    dest:"public",
    target:"serverless",
    disable: process.env.NODE_ENV === "development",
    fallbacks: {
      document: '/src/pages/404.tsx',
    }
  },

  reactStrictMode: true
  
})
