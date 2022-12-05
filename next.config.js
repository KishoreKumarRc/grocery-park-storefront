const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

module.exports = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  images: {
   // domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com", "localhost"],
    domains: ["medusa-file.nyc3.digitaloceanspaces.com"],
       //medusa-public-images.s3.eu-west-1.amazonaws.com https://medusa-file.nyc3.digitaloceanspaces.com 
      //  remotePatterns: [
      //   {
      //     protocol: 'https',
      //     hostname: 'medusa-file.nyc3.digitaloceanspaces.com',         
      //   },
      //],
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
