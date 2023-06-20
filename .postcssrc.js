// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  },
  baseUrl: './',
  devServer: {
    proxy:{
      '/api': {
        target: 'http://192.168.31.204:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        },
      }
    }
  }
}
