module.exports = {
	"transpileDependencies": [
		"vuetify"
	],
	publicPath:'./',
	devServer: {
		host: '0.0.0.0',
		port:"9001",
		disableHostCheck: true,
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
