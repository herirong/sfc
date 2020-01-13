module.exports = {
	"transpileDependencies": [
		"vuetify"
	],
	"publicPath": "./",
	devServer: {
		proxy: {
			'/kugouApi/*': {
				target: 'https://songsearch.kugou.com',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					"^/kugouApi": "/"
				}
			}
		}
	}
}
