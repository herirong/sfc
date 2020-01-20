<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
			<v-list dense>
				<template v-for="item in items">
					<v-row v-if="item.heading" :key="item.heading" align="center">
						<v-col cols="6">
							<v-subheader v-if="item.heading">
								{{ item.heading }}
							</v-subheader>
						</v-col>
						<v-col cols="6" class="text-center">
							<a href="#!" class="body-2 black--text">EDIT</a>
						</v-col>
					</v-row>
					<v-list-group v-else-if="item.children" :key="item.text" v-model="item.model" :prepend-icon="item.model ? item.icon : item['icon-alt']"
					append-icon="">
						<template v-slot:activator>
							<v-list-item>
								<v-list-item-content>
									<v-list-item-title>
										{{ item.text }}
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</template>
						<v-list-item v-for="(child, i) in item.children" :key="i" link>
							<v-list-item-action v-if="child.icon">
								<v-icon>{{ child.icon }}</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>
									{{ child.text }}
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-group>
					<v-list-item @click="menuEvent(item.url)" v-else :key="item.text" link>
						<v-list-item-action>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>
								{{ item.text }}
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="cyan" dark flat>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title>随身听</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-bell</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
			<!-- <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
				<span class="hidden-sm-and-down">Google Contacts</span>
			</v-toolbar-title> -->
			<!-- <v-text-field flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search" class="hidden-sm-and-down" />
			<v-spacer />
			<v-btn icon>
				<v-icon>mdi-apps</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-bell</v-icon>
			</v-btn>
			<v-btn icon large>
				<v-avatar size="32px" item>
					<v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify" />
				</v-avatar>
			</v-btn> -->
		</v-app-bar>
		<musicPlayerPage v-if="currentPage=='musicPlayerPage'"></musicPlayerPage>
		<faceapiPage v-if="currentPage=='faceapiPage'"></faceapiPage>

		<v-speed-dial v-model="fab" :top="top" :bottom="bottom" :right="right" :left="left" :direction="direction"
		:open-on-hover="hover" :transition="transition">
			<template v-slot:activator>
				<v-btn v-model="fab" color="blue darken-2" dark fab>
					<v-icon v-if="fab">mdi-close</v-icon>
					<v-icon v-else>mdi-account-circle</v-icon>
				</v-btn>
			</template>
			<v-btn fab dark small color="green">
				<v-icon>mdi-pencil</v-icon>
			</v-btn>
			<v-btn fab dark small color="indigo">
				<v-icon>mdi-plus</v-icon>
			</v-btn>
			<v-btn fab dark small color="red">
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</v-speed-dial>
	</v-app>
</template>

<script>
	import musicPlayerPage from './components/musicPlayer'
	import faceapiPage from './components/faceapiPage'
	export default {
		props: {
			source: String,
		},
		components: {
			musicPlayerPage,
			faceapiPage
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


			currentPage: "musicPlayerPage",
			dialog: false,
			drawer: null,
			items: [{
					url: "musicPlayerPage",
					icon: 'mdi-contacts',
					text: '音乐'
				},
				{
					url: "faceapiPage",
					icon: 'mdi-contacts',
					text: '人脸识别'
				}
			],
		}),
		methods: {
			menuEvent(d) {
				this.currentPage = d
				this.drawer = !this.drawer
			}
		}
	}
</script>

<style>
	/* This is for documentation purposes and will not be needed in your application */
	#inspire .v-speed-dial {
		position: absolute;
	}

	#inspire .v-btn--floating {
		position: relative;
	}
</style>
