const withPWA = require("next-pwa")

module.exports = withPWA({
  target:"serverless",
  pwa:{
    dest:"public",
    disable: process.env.NODE_ENV === "development",
    fallbacks: {
      document: "/pages/404.tsx"
    }
  },

  reactStrictMode: true
  
})
