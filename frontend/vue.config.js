const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.108:3000',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})