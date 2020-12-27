<template>
	<view class="video-play">
		<image class="bg-img" :src="videoObj.img"></image>
		<view class="tool-box">
			<view @click="handleMuted" class="tool-item">
				<template v-if="muted">
					正常
				</template>
				<template v-else>
					静音
				</template>
			</view>
			<view class="tool-item">
				分享
				<button open-type="share"></button>
			</view>
		</view>
		<view class="video-box">
			<video :muted="muted" :src="videoObj.video" controls objectFit="fill"></video>
		</view>
		<view class="btn-box">
			<view class="btn" @click="handleDownload">下载视频</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoObj: {},
				// 是否静音
				muted: false
			}
		},
		onLoad() {
			this.videoObj = getApp().globalData.video
		},
		methods: {
			// 声音开关
			handleMuted() {
				this.muted = !this.muted
			},
			// 下载视频
			async handleDownload() {
				await uni.showLoading({
					title: '视频下载中'
				})
				// 先下载到内存
				const {
					tempFilePath
				} = (await uni.downloadFile({
					url: this.videoObj.video
				}))[1]
				// 再保存到本地
				await uni.saveVideoToPhotosAlbum({
					filePath: tempFilePath
				})
				await uni.hideLoading()
				await uni.showToast({
					title: '下载完成'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-play {
		position: relative;
	}

	.bg-img {
		position: absolute;
		width: 100vw;
		height: 100vh;
		filter: blur(20px);
		z-index: -1;
	}

	.tool-box {
		display: flex;
		justify-content: flex-end;
		margin: 10rpx 0;

		.tool-item {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background-color: rgba($color: #000000, $alpha: .4);
			text-align: center;
			line-height: 80rpx;
			margin-right: 20rpx;
			color: #FFFFFF;
			position: relative;

			button {
				position: absolute;
				top: 0;
				opacity: 0;
				width: 100%;
				height: 100%;
			}
		}
	}

	.video-box {
		display: flex;
		justify-content: center;

		video {
			width: 360rpx;
			height: 600rpx;
		}
	}

	.btn-box {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;

		.btn {
			width: 360rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			background-color: rgba(0, 0, 0, .2);
			color: #FFFFFF;
		}
	}
</style>
