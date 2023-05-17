const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: process.env.VUE_APP_API_BASE_URL,
  },
  transpileDependencies: true,
});
