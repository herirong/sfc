<template>
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
		</v-app-bar>
		<v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
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
		</v-toolbar>
		<v-layout text-center wrap>
			<v-flex xs12>
				<v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
			</v-flex>

			<v-flex mb-4>
				<h1 class="display-2 font-weight-bold mb-3">
					马不停蹄开发中。。。。
				</h1>
			</v-flex>
		</v-layout>
	</v-card>
</template>

<script>
	export default {
		name: 'HelloWorld',
		methods:{
			switchMenuState(){
				this.$store.state.toolBarMenuState=!this.$store.state.toolBarMenuState
			},
		},
		data: () => ({
			ecosystem: [{
					text: 'vuetify-loader',
					href: 'https://github.com/vuetifyjs/vuetify-loader',
				},
				{
					text: 'github',
					href: 'https://github.com/vuetifyjs/vuetify',
				},
				{
					text: 'awesome-vuetify',
					href: 'https://github.com/vuetifyjs/awesome-vuetify',
				},
			],
			importantLinks: [{
					text: 'Documentation',
					href: 'https://vuetifyjs.com',
				},
				{
					text: 'Chat',
					href: 'https://community.vuetifyjs.com',
				},
				{
					text: 'Made with Vuetify',
					href: 'https://madewithvuejs.com/vuetify',
				},
				{
					text: 'Twitter',
					href: 'https://twitter.com/vuetifyjs',
				},
				{
					text: 'Articles',
					href: 'https://medium.com/vuetify',
				},
			],
			whatsNext: [{
					text: 'Explore components',
					href: 'https://vuetifyjs.com/components/api-explorer',
				},
				{
					text: 'Select a layout',
					href: 'https://vuetifyjs.com/layout/pre-defined',
				},
				{
					text: 'Frequently Asked Questions',
					href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
				},
			],
		}),
	};
</script>
