<template>
	<v-app-bar app id="inspire">
		<div style="position: relative" class="margin">
			<video onloadedmetadata="onPlay(this)" id="inputVideo" autoplay muted playsinline></video>
			<canvas id="overlay" />
		</div>
	</v-app-bar app>
</template>

<script>
	export default {
		props: {
			source: String,
		},
		data: () => ({

		}),
	}
</script>
