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
		<musicPlayerPage v-if="currentPage=='musicPlayerPage'"></musicPlayerPage>
		<faceapiPage v-if="currentPage=='faceapiPage'"></faceapiPage>

		
	</v-app>
</template>

<script>
	import musicPlayerPage from './components/musicPlayer'
	import faceapiPage from './components/faceapiPage'
	import { mapState } from 'vuex'
	export default {
		props: {
			source: String,
		},
		components: {
			musicPlayerPage,
			faceapiPage
		},
		computed:mapState({
			drawer: state => state.toolBarMenuState
		}),
		data:() => ({
			currentPage: "musicPlayerPage",
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
			}
		}
	}
</script>


