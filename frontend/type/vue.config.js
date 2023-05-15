const { defineConfig } = require('@vue/cli-service')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  pages: {
    signup:{
    entry: 'src/signup.js' ,
    template: 'public/signup.html'
    } ,
    index:{
      entry: 'src/main.js' ,
      template: 'public/index.html'
    },
    login:{
      entry: 'src/login.js' ,
      template: 'public/login.html'
    },
    profile:{
      entry: 'src/profile.js' ,
      template: 'public/profile.html'
    },
  },
}