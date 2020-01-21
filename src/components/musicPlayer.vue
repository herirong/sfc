<template>
	<v-app id="inspire">
	<v-card>
		<v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
			<v-app-bar-nav-icon @click.stop="switchMenuState()" />
			<v-toolbar-title>随身听</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon @click="onbuild()">
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
			<v-btn icon @click="onbuild()">
				<v-icon>mdi-bell</v-icon>
			</v-btn>
			<v-btn icon @click="onbuild()">
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
			<template v-slot:extension>
				<v-tabs fixed-tabs="true" v-model="currentTab" align-with-title background-color="transparent">
					<v-tabs-slider color="yellow"></v-tabs-slider>

					<v-tab v-for="item in tabInfo" :key="item">
						{{ item }}
					</v-tab>
				</v-tabs>
			</template>
		</v-app-bar>
		<v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
			<template v-slot:extension>
			</template>
		</v-toolbar>

		<v-tabs-items v-model="currentTab">
			<v-tab-item>
				<v-card flat>
					<v-container>
						<v-list-item>
							<v-list-item-avatar color="grey">
								<v-img :src="audioInfo&&audioInfo.authors[0].avatar"></v-img>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title class="headline">{{audioInfo.song_name}}</v-list-item-title>
								<v-list-item-subtitle>by {{audioInfo.author_name}}-{{audioInfo.album_name}}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-container>


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

				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card flat>
					<v-card-text v-html="audioInfo.lyrics">

					</v-card-text>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card flat>
					<!-- <v-row class="mx-2">
						<v-text-field v-model="searchValue" flat single-line prepend-inner-icon="mdi-magnify" label="Search" class="" />
						<v-btn color="primary" text @click="getSearchResult()">搜索</v-btn>
					</v-row> -->
					<v-list :disabled="false" :dense="false" :two-line="false" :three-line="false" :shaped="false" :flat="false"
					:subheader="false" :sub-group="false" :nav="false" :avatar="false" :rounded="true">
						<v-subheader>播放列表</v-subheader>
						<v-list-item-group v-model="audioInfo" color="primary">
							<v-list-item v-for="(item, i) in audioInfoList" :key="i" @click="audioIndex=item.index">
								<!-- <v-list-item-avatar v-if="avatar">
									<v-img :src="audioInfo.avatar"></v-img>
								</v-list-item-avatar> -->
								<v-list-item-content>
									<v-list-item-title v-html="i+'.'+item.song_name+' —— '+item.author_name"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-card>
	<v-dialog v-model="dialog" persistent max-width="290">
		<v-card>
			<v-card-title class="headline">Use Google's location service?</v-card-title>
			<v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even
				when no apps are running.</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
				<v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
	<v-speed-dial v-model="fab" :top="top" :bottom="bottom" :right="right" :left="left" :direction="direction"
	:open-on-hover="hover" :transition="transition">
		<template v-slot:activator>
			<v-btn v-model="fab" color="blue darken-2" dark fab>
				<v-icon v-if="fab">mdi-close</v-icon>
				<v-icon v-else>mdi-account-circle</v-icon>
			</v-btn>
		</template>
		<v-btn fab dark small color="green" @click="onbuild()">
			<v-icon>mdi-pencil</v-icon>
		</v-btn>
		<v-btn fab dark small color="indigo" @click="onbuild()">
			<v-icon>mdi-plus</v-icon>
		</v-btn>
		<v-btn fab dark small color="red" @click="onbuild()">
			<v-icon>mdi-delete</v-icon>
		</v-btn>
	</v-speed-dial>
	</v-app>
</template>

<script>
	import audioPlayer from '../plugins/audioPlayer';
	import songs from '../assets/songs.js';
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
			direction: 'top',
			fab: false,
			fling: false,
			hover: false,
			tabs: null,
			top: false,
			right: true,
			bottom: true,
			left: false,
			transition: 'slide-y-reverse-transition',

			currentTab: null,
			tabInfo: [
				'播放', '歌词', '发现'
			],
			audioIndex: -1,
			audioInfo: {},
			audioInfoList: songs,
			searchValue: "",
			dialog: false,
			items: [{
				icon: 'mdi-contacts',
				text: '音乐'
			}],
		}),
		watch: {
			audioIndex(n) {
				this.audioInfo = this.audioInfoList[n]
				this.audioInfo.lyrics = this.audioInfo.lyrics.replace(/\r\n/g, "<br/>")
				this.audioInfo.play_url = `http://sfc.server2012.herirong.ltd/songs/${this.audioInfo.song_name}.mp3`
				console.log(this.audioInfo)
			}
		},
		methods: {
			onbuild() {
				this.dialog = !this.dialog
			},
			switchMenuState(){
				this.$store.state.toolBarMenuState=!this.$store.state.toolBarMenuState
			},
			getAudioIndex(d) {
				this.audioIndex = d
			},
			getSearchResult() {
				let self = this
				self.audioIndex = 0

				self.audioInfoList = self.audioInfoList.filter(info => {
					return (info.index <= 20)
				})
				console.log(self.audioInfoList)
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
<style>
	/* This is for documentation purposes and will not be needed in your application */
	#inspire .v-speed-dial {
		position: fixed;
	}

	#inspire .v-btn--floating {
		position: relative;
	}
</style>
