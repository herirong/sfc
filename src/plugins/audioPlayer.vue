<template>
    <v-card style="text-align: center">
        <v-card-text>
			<v-btn outlined color="teal" @click="pre()" icon>
				<v-icon outlined>mdi-rewind</v-icon>
			</v-btn>
			<v-btn outlined icon class="ma-2" color="teal" @click.native="playing ? pause() : play()" :disabled="!loaded">
				<v-icon v-if="!playing || paused">play_arrow</v-icon>
				<v-icon v-else>pause</v-icon>
			</v-btn>
			<v-btn outlined color="teal" @click="next()" icon>
			<v-icon>mdi-fast-forward</v-icon>
			</v-btn>
            <v-btn outlined icon class="ma-2" color="teal" @click.native="stop()" :disabled="!loaded">
                <v-icon>stop</v-icon>
            </v-btn>
            <v-btn outlined icon class="ma-2" color="teal" @click.native="mute()" :disabled="!loaded">
                <v-icon v-if="!isMuted">volume_up</v-icon>
                <v-icon v-else>volume_off</v-icon>
            </v-btn>
            <v-btn outlined icon class="ma-2" color="teal" @click.native="loaded ? download() : reload()">
                <v-icon v-if="!loaded">refresh</v-icon>
                <v-icon v-else>get_app</v-icon>
            </v-btn>
            <v-progress-linear v-model="percentage" height="5" style="margin-top: 15px; margin-bottom: 15px;" @click.native="setPosition()" color="teal" :disabled="!loaded"></v-progress-linear>
            <p>{{ currentTime }} / {{ duration }}</p>
        </v-card-text>
        <audio id="player" ref="player" v-on:ended="ended" v-on:canplay="canPlay" :src="file"></audio>
    </v-card>
</template>
<script>
    const formatTime = second => new Date(second * 1000).toISOString().substr(11, 8);

    export default {
        name: 'vuetify-audio',
        props: {
			audioIndex: {
				type: Number,
				default: 0
			},
            fileList: {
                type: Array,
                default: null
            },
            autoPlay: {
                type: Boolean,
                default: false
            },
            ended: {
                type: Function,
                default: () => {},
            },
            canPlay: {
                type: Function,
                default: () => {},
            },
        },
        computed: {
            duration: function () {
                return this.audio ? formatTime(this.totalDuration) : ''
            },
        },
        data () {
            return {
				file:"",
                firstPlay: true,
                isMuted: false,
                loaded: false,
                playing: false,
                paused: false,
                percentage: 0,
                currentTime: '00:00:00',
                audio: undefined,
                totalDuration: 0,
            }
        },
		watch: {
			audioIndex(n) {
				this.$emit('getAudioIndex', n)
			}
		},
        methods: {
            setPosition () {
                this.audio.currentTime = parseInt(this.audio.duration / 100 * this.percentage);
            },
            stop () {
                this.paused = this.playing = false
                this.audio.pause()
                this.audio.currentTime = 0
            },
            play () {
                if (this.playing) return
				this.file=this.fileList.length>0?this.fileList[this.audioIndex]:""
                this.paused = false
                this.audio.play().then(() => this.playing = true)
            },
			next(){
				if(this.audioIndex == this.fileList.length-1) // this is the end of the songs.
					this.audioIndex = 0;
				else
					this.audioIndex++
				this.file = this.fileList[this.audioIndex]||"";
				this.paused = false
				this.audio.load()
			},
			pre(){
				if(this.audioIndex == 0) // this is the end of the songs.
					this.audioIndex = this.fileList.length-1;
				else
					this.audioIndex--
				this.file = this.fileList[this.audioIndex]||"";
				this.paused = false
				this.audio.load();
			},
            pause () {
                this.paused = !this.paused;
                (this.paused) ? this.audio.pause() : this.audio.play()
            },
            download () {
                this.audio.pause()
                window.open(this.file, 'download')
            },
            mute () {
                this.isMuted = !this.isMuted
                this.audio.muted = this.isMuted
                this.volumeValue = this.isMuted ? 0 : 75
            },
            reload () {
                this.audio.load();
            },
            _handleLoaded: function () {
				this.globalData.audioIndex=this.audioIndex
                if (this.audio.readyState >= 2) {
                    if (this.audio.duration === Infinity) {
                        // Fix duration for streamed audio source or blob based
                        // https://stackoverflow.com/questions/38443084/how-can-i-add-predefined-length-to-audio-recorded-from-mediarecorder-in-chrome/39971175#39971175
                        this.audio.currentTime = 1e101;
                        this.audio.ontimeupdate = () => {
                            this.audio.ontimeupdate = () => {}
                            this.audio.currentTime = 0
                            this.totalDuration = parseInt(this.audio.duration)
                            this.loaded = true;
                        }
                    } else {
                        this.totalDuration = parseInt(this.audio.duration)
                        this.loaded = true
                    }

                    if (this.autoPlay) this.audio.play().then(() => this.playing = true,() => alert("文件格式不支持！"))

                } else {
                    throw new Error('Failed to load sound file')
                }
            },
            _handlePlayingUI: function () {
                this.percentage = this.audio.currentTime / this.audio.duration * 100
                this.currentTime = formatTime(this.audio.currentTime)
            },
            _handlePlayPause: function (e) {
				console.log("playing in "+this.file)
				console.log("playListCount:"+this.fileList.length)
                if (e.type === 'play' && this.firstPlay) {
                    // in some situations, audio.currentTime is the end one on chrome
                    this.audio.currentTime = 0;
                    if (this.firstPlay) {
                        this.firstPlay = false;
                    }
                }
                if (e.type === 'pause' && this.paused === false && this.playing === false) {
                    this.currentTime = '00:00:00'
                }
            },
            _handleEnded () {
                this.paused = this.playing = false;
				this.audioIndex++;
				let nextSong = this.fileList[this.audioIndex];
				this.audio.src = nextSong;
				this.audio.load();
				this.audio.play();
				if(this.audioIndex == this.fileList.length-1) // this is the end of the songs.
				{
					this.audioIndex = 0;
				}
            },
            init: function () {
				this.file=this.fileList[this.audioIndex]
                this.audio.addEventListener('timeupdate', this._handlePlayingUI);
                this.audio.addEventListener('loadeddata', this._handleLoaded);
                this.audio.addEventListener('pause', this._handlePlayPause);
                this.audio.addEventListener('play', this._handlePlayPause);
                this.audio.addEventListener('ended', this._handleEnded);
            },
        },
        mounted () {
            this.audio = this.$refs.player;
            this.init();
        },
        beforeDestroy () {
            this.audio.removeEventListener('timeupdate', this._handlePlayingUI)
            this.audio.removeEventListener('loadeddata', this._handleLoaded)
            this.audio.removeEventListener('pause', this._handlePlayPause)
            this.audio.removeEventListener('play', this._handlePlayPause)
            this.audio.removeEventListener('ended', this._handleEnded);
        }

    }
</script>
