<template>
	<v-card max-width="400" class="mx-auto">
		<v-list-item two-line>
			<v-list-item-content>
				<v-list-item-title class="headline">随身听</v-list-item-title>
				<v-list-item-subtitle>beat</v-list-item-subtitle>
				<v-row class="mx-2">
					<v-text-field v-model="searchValue" flat single-line prepend-inner-icon="mdi-magnify" label="Search" class="" />
					<v-btn color="primary" text @click="getSearchResult()">搜索</v-btn>
				</v-row>
				
				
			</v-list-item-content>
		</v-list-item>
		<v-divider></v-divider>
		<audioPlayer :fileList="fileList"></audioPlayer>
	</v-card>
</template>

<script>
	import audioPlayer from '../plugins/audioPlayer';
	export default {
		props: {
			source: String,
		},
		components: {
			audioPlayer,
		},
		data: () => ({
			searchValue:"",
			fileList:["https://sharefs.yun.kugou.com/202001122138/dcb61c21131ec5feeb6d5e1f37719888/G172/M0B/10/11/jJQEAF1_oIKAe-sYADZNDEGOZCA219.mp3",
			"http://sx.sycdn.kuwo.cn/d47706a85497f529f75fd66bf5c18cfa/5e1b24f8/resource/n2/96/21/3384082169.mp3",
			"http://other.web.ra01.sycdn.kuwo.cn/370e2770eb558b1688d278e1fbd4d5ff/5e1b261f/resource/n2/320/31/79/1212072991.mp3"],
			dialog: false,
			drawer: null,
			items: [{
					icon: 'mdi-contacts',
					text: '音乐'
				}
			],
		}),
		methods:{
			getSearchResult(Keyword){
				let self=this
				Keyword=Keyword||self.searchValue||"周杰伦"
					// this.$http.get(`/kugouApi/api/v3/search/song?format=json&keyword=${Keyword}&page=1&pagesize=&showtype=1`).then(d=>{
					// 	alert(d)
					// })
				self.axios.get(`/kugouApi/song_search_v2?keyword=${Keyword}&page=1&pagesize=3&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&_=1578900789648`).then(d=>{
					d=d.data.lists;
					d.forEach(item=>{
						let fileHash=item.FileHash
						alert(fileHash)
						// self.axios.get(`/wwwapi/yy/index.php?r=play/getdata&callback=jQuery19104331557712927194_1578925301048&hash=${fileHash}&album_id=28687022&dfid=10KnqA3Nm3xX0jLaTA3e2XXs&mid=273b5f666fb5fbfaeca00426e445af95&platid=4&_=1578925301049`).then(songInfo=>{
						// 	alert(songInfo.data.play_backup_url)
						// 	self.fileList.push(songInfo.data.play_backup_url)
						// })	
					})
				})
				
			}
		}
	}
</script>
