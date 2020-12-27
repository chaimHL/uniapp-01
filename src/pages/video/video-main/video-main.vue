<template>
	<scroll-view 
	scroll-y
	enable-flex
	class="video-main"
	@scrolltolower="handleScrolltolower">
		<view class="video-item" v-for="item in videowp" :key="item.id" @click="handleGoViedo(item)">
			<image :src="item.img" mode="widthFix"></image>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			urlobj: Object
		},
		data() {
			return {
				videowp: [],
				hasMore: true
			}
		},
		mounted() {
			this.getList()
		},
		watch: {
			urlobj() {
				this.getList(),
				// 重置数据数组
				this.videowp = []
			}
		},
		methods: {
			async getList() {
				try{
					const res = await this.request({
						url: this.urlobj.url,
						data: this.urlobj.params
					})
					if (res.res.videowp.length === 0) {
						this.hasMore = false
						uni.showToast({
							title: '没有更多了',
							icon: 'none'
						})
						return
					}
					this.videowp = [...this.videowp, ...res.res.videowp]
				}catch(e){
					console.log(e)
				}
			},
			// 滚动触底加载更多
			handleScrolltolower() {
				if (this.hasMore) {
					this.urlobj.params.skip += this.urlobj.params.limit
					this.getList()
				} else {
					uni.showToast({
						title: '没有更多了',
						icon: 'none'
					})
				}
			},
			// 图片点击，跳转页面
			handleGoViedo(item) {
				getApp().globalData.video = item
				uni.navigateTo({
					url: '/pages/video-play/video-play'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-main{
		display: flex;
		flex-wrap: wrap;
		height: calc(100vh - 36rpx);
		.video-item{
			width: (100% / 3);
			border: 4rpx solid #FFFFFF;
			image{
				height: 100%;
			}
		}
	}
</style>
