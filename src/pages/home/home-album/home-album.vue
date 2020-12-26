<template>
	<scroll-view scroll-y class="album-view" @scrolltolower="handleToLower">
		<!-- 轮播 -->
		<view class="album-swiper">
			<swiper
			indicator-dots
			autoplay
			circular>
				<swiper-item
				v-for="item in banner"
				:key="item.id">
					<image :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 文章列表 -->
		<view class="album-wrap">
			<navigator
			:url="`/pages/album/album?id=${item.id}`"
			class="album-item"
			v-for="item in album"
			:key="item.id">
				<view class="album-image">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
				<view class="album-content">
					<view class="content-top">
						<view class="album-title">{{item.name}}</view>
						<view class="album-discribe">{{item.desc}}</view>
					</view>
					<view class="album-btn">
						<view class="album-attention">+关注</view>
					</view>
				</view>
			</navigator>
		</view>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			// 请求参数
			params: {
				limit: 30,
				order: 'new',
				skip: 0
			},
			// banner数据
			banner: [],
			// 专辑数据
			album: [],
			// 是否有更多数据
			hasMore: true
		}
	},
	mounted() {
		uni.setNavigationBarTitle({
		    title: '专辑'
		})
		this.getList()
	},
	methods: {
		getList() {
			this.request({
				url: 'image/v1/wallpaper/album',
				data: this.params
			}).then(result => {
				if (this.banner.length === 0) {
					this.banner = result.res.banner
				}
				if (result.res.album.length === 0) {
					this.hasMore = false
					return
				}
				this.album = [...this.album, ...result.res.album]
			})
		},
		// 页面下滑触底，触发加载新内容
		handleToLower() {
			if (this.hasMore) {
				this.params.skip += this.params.limit
				this.getList()
			} else{
				uni.showToast({
					title: '没有更多了',
					icon: 'none'
				})
			}
			
		}
	}
}
</script>
<style lang="scss" scoped>
	.album-view{
		height: calc(100vh - 36rpx);
	}
	.album-swiper{
		swiper{
			// 因为微信小程序swiper有默认高度150px, image默认高度240px, image默认宽度320px(已在base.wxss重置为100%)
			height: calc(750rpx / 2.3);
			image{
				height: 100%;
			}
		}
	}
	.album-wrap{
		.album-item{
			display: flex;
			padding: 20rpx 20rpx 0;
			.album-image{
				width: 200rpx;
				height: 200rpx;
				flex-shrink: 0;
				image{
					height: 100%;
				}
			}
			.album-content{
				overflow: hidden;
				padding-left: 14rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 100%;
				.album-title{
					font-size: 32rpx;
					font-weight: bold;
					color: #323232;
					margin-bottom: 8rpx;
				}
				.album-discribe{
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					color: #646464;
				}
				.album-btn{
					display: flex;
					justify-content: flex-end;
					padding-bottom: 20rpx;
					.album-attention{
						color: $color;
					}
				}
			}
		}
	}
</style>
