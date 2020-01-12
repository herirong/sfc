<template>
	<v-card max-width="400" class="mx-auto">
		<v-list-item two-line>
			<v-list-item-content>
				<v-list-item-title class="headline">随身听</v-list-item-title>
				<v-list-item-subtitle>beat</v-list-item-subtitle>
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
			fileList:["http://other.web.rh01.sycdn.kuwo.cn/f01c2a8511a627ed00dfe6f6d5fa2b21/5e1b0d98/resource/n2/9/66/3331052726.mp3",
			"https://sharefs.yun.kugou.com/202001122138/dcb61c21131ec5feeb6d5e1f37719888/G172/M0B/10/11/jJQEAF1_oIKAe-sYADZNDEGOZCA219.mp3",
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
	}
</script>
