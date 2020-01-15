<template>
	<v-card>
		<v-toolbar color="cyan" dark flat>
			<template v-slot:extension>
				<v-tabs v-model="currentTab" align-with-title background-color="transparent">
					<v-tabs-slider color="yellow"></v-tabs-slider>

					<v-tab v-for="item in tabInfo" :key="item">
						{{ item }}
					</v-tab>
				</v-tabs>
			</template>
		</v-toolbar>

		<v-tabs-items v-model="currentTab">
			<v-tab-item>
				<v-list-item>
					<v-list-item-avatar color="grey">
						<v-img :src="audioInfo&&audioInfo.authors[0].avatar"></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="headline">{{audioInfo.song_name}}</v-list-item-title>
						<v-list-item-subtitle>by {{audioInfo.author_name}}-{{audioInfo.album_name}}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

				<v-img :src="audioInfo.img" height="194"></v-img>
				<!-- <v-card-actions>
						<v-btn text color="deep-purple accent-4">
							Read
						</v-btn>
						<v-btn text color="deep-purple accent-4">
							Bookmark
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn icon>
							<v-icon>mdi-heart</v-icon>
						</v-btn>
						<v-btn icon>
							<v-icon>mdi-share-variant</v-icon>
						</v-btn>
					</v-card-actions> -->
				<v-divider></v-divider>
				<audioPlayer v-on:getAudioIndex="getAudioIndex" :audioIndex="audioIndex" :autoPlay="true" :audioInfoList="audioInfoList"></audioPlayer>
				
			</v-tab-item>
			<v-tab-item>
				<v-card flat>
					<!-- <v-row class="mx-2">
						<v-text-field v-model="searchValue" flat single-line prepend-inner-icon="mdi-magnify" label="Search" class="" />
						<v-btn color="primary" text @click="getSearchResult()">搜索</v-btn>
					</v-row> -->
					<v-list :disabled="false" :dense="false" :two-line="false" :three-line="false" :shaped="false" :flat="false" :subheader="false" :sub-group="false" :nav="false" :avatar="false" :rounded="true">
						<v-subheader>播放列表</v-subheader>
						<v-list-item-group v-model="audioInfo" color="primary">
							<v-list-item v-for="(item, i) in audioInfoList" :key="i" :inactive="inactive" @click="audioIndex=item.index">
								<!-- <v-list-item-avatar v-if="avatar">
									<v-img :src="audioInfo.avatar"></v-img>
								</v-list-item-avatar> -->
								<v-list-item-content>
									<v-list-item-title v-html="item.song_name+' —— '+item.author_name"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-card>

	<!-- <v-card max-width="344" class="mx-auto">
		<v-list-item>
			<v-list-item-avatar color="grey"></v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
				<v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194"></v-img>

		<v-row class="mx-2">
			<v-text-field v-model="searchValue" flat single-line prepend-inner-icon="mdi-magnify" label="Search" class="" />
			<v-btn color="primary" text @click="getSearchResult()">搜索</v-btn>
		</v-row>

		<v-divider></v-divider>
		<v-list-item-subtitle>{{audioInfo.song_name}}</v-list-item-subtitle>
		<v-list-item-subtitle>{{audioInfo.author_name}}</v-list-item-subtitle>
		<v-list-item-subtitle>{{audioInfo.album_name}}</v-list-item-subtitle>
		<v-list-item-subtitle>{{audioInfo.img}}</v-list-item-subtitle>
		<audioPlayer :fileList="fileList"></audioPlayer>

		<v-card-actions>
			<v-btn text color="deep-purple accent-4">
				Read
			</v-btn>
			<v-btn text color="deep-purple accent-4">
				Bookmark
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon>mdi-heart</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-share-variant</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card> -->
</template>

<script>
	import audioPlayer from '../plugins/audioPlayer';
	export default {
		props: {
			source: String,
		},
		components: {
			audioPlayer
		},
		created: function() {
			this.getSearchResult();
		},
		data: () => ({
			currentTab: null,
			tabInfo: [
				'播放', '发现'
			],
			audioIndex: -1,
			audioInfo: {},
			audioInfoList: [],
			searchValue: "",
			dialog: false,
			drawer: null,
			items: [{
				icon: 'mdi-contacts',
				text: '音乐'
			}],
		}),
		watch: {
			audioIndex(n) {
				this.audioInfo = this.audioInfoList[n]
			}
		},
		methods: {
			getAudioIndex(d) {
				this.audioIndex = d
			},
			getSearchResult() {
				if(!window["songs"]){
					alert("no songs")
				}
				let self = this
				self.audioInfoList=window["songs"]
				//self.audioInfoList=JSON.parse('[{"hash":"5fce4cbcb96d6025033bce2025fc3943","timelength":215000,"filesize":3443771,"audio_name":"周杰伦 - 告白气球","have_album":1,"album_name":"周杰伦的床边故事","album_id":"1645030","img":"http://imge.kugou.com/stdmusic/20160623/20160623233610830051.jpg","have_mv":1,"video_id":"589001","author_name":"周杰伦","song_name":"告白气球","author_id":"3520","privilege":10,"privilege2":"1010","play_url":"https://webfs.yun.kugou.com/202001151323/f6ea7927a9830f328c3dcf63ace0e603/part/0/960129/G063/M03/06/11/34YBAFdskzmAUMlOADSMOxgm3l4714.mp3","authors":[{"author_id":"3520","is_publish":"1","sizable_avatar":"http://singerimg.kugou.com/uploadpic/softhead/{size}/20180515/20180515002522714.jpg","author_name":"周杰伦","avatar":"http://singerimg.kugou.com/uploadpic/softhead/400/20180515/20180515002522714.jpg"}],"is_free_part":1,"bitrate":128,"audio_id":"22084042","play_backup_url":"https://webfs.cloud.kugou.com/202001151323/0ab3047619c934833ffff0e8d7a82ee7/part/0/960129/G063/M03/06/11/34YBAFdskzmAUMlOADSMOxgm3l4714.mp3","trans_param":{"cid":5678206,"pay_block_tpl":1,"musicpack_advance":1,"display_rate":0,"hash_offset":{"offset_hash":"A635FEFCF2F1831CA1F53A9508A9777C","start_byte":0,"start_ms":0,"file_type":0,"end_ms":60000,"end_byte":960129},"display":0}}]')
				self.audioIndex=0
				// console.log(this.fileList)
				// let self = this
				// Keyword = Keyword || self.searchValue || "周杰伦"
				// // this.$http.get(`/kugouApi/api/v3/search/song?format=json&keyword=${Keyword}&page=1&pagesize=&showtype=1`).then(d=>{
				// // 	alert(d)
				// // })
				// self.axios.get(
				// 	`/kugouApi/song_search_v2?keyword=${Keyword}&page=1&pagesize=3&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&_=1578900789648`
				// ).then(d => {
				// 	d = d.data.data.lists;
				// 	d.forEach(item => {
				// 		let fileHash = item.FileHash
				// 		self.axios.get(
				// 			`/wwwapi/yy/index.php?r=play/getdata&hash=${fileHash}&album_id=28687022&dfid=10KnqA3Nm3xX0jLaTA3e2XXs&mid=273b5f666fb5fbfaeca00426e445af95&platid=4&_=1578925301049`
				// 		).then(songInfo => {
				// 			this.audioInfo = songInfo = songInfo.data.data
				// 			self.audioInfoList.push(songInfo)
				// 			self.fileList.push(songInfo.play_url)
				// 		})
				// 	})
				// })

			}
		}
	}
</script>
