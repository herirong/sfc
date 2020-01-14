module.exports = {
	"transpileDependencies": [
		"vuetify"
	],
	publicPath: process.env.NODE_ENV === 'production'
	    ? '/sfc/'
	    : '/'
	devServer: {
		disableHostCheck:true,
		proxy: {
			'/kugouApi/*': {
				target: 'https://songsearch.kugou.com',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					"^/kugouApi": "/"
				}
			},
			'/wwwapi/*': {
				target: 'https://wwwapi.kugou.com',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					"^/wwwapi": "/"
				}
			}
		}
	}
}
