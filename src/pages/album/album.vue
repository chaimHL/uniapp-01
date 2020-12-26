<template>
	<view>
		<!-- 头部背景图 -->
		<view class="album-top-bg">
			<image mode="widthFix" :src="album.cover"></image>
			<view class="bg-des">
				<view class="des-name">{{album.name}}</view>
				<view class="bg-btn">关注专辑</view>
			</view>
		</view>
		<!-- 作者简介 -->
		<view class="album-author-wrap">
			<view class="author-info">
				<image mode="widthFix" :src="album.user.avatar"></image>
				<text class="author-name">{{album.user.name}}</text>
			</view>
			<view class="author-des">
				<!-- 这里用text因为数据里有换行符 -->
				<text>{{album.desc}}</text>
			</view>
		</view>
		<!-- 图片列表 -->
		<view class="album-list">
			<view 
			class="album-item"
			v-for="(item, index) in wallpaper"
			:key="item.id">
				<go-detail :list="wallpaper" :index="index">
					<image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
				</go-detail>
			</view>
		</view>
	</view>
</template>

<script>
import goDetail from '@/components/goDetail.vue'
export default {
	components: {
		goDetail
	},
	data() {
		return {
			params: {
				limit: 30,
				order: 'new',
				skip: 0,
				// 1” 表示第一次请求 “0”表示不是第一次请求
				first: 1
			},
			// 前一个页面通过url传递的参数
			id: -1,
			// 获取的数据
			album: {},
			wallpaper: [],
			// 是否还有更多数据
			hasMore: true
		}
	},
	onLoad(option) {
		// console.log(option)
		this.id = option.id
		this.getList()
	},
	onReachBottom() {
		if (this.hasMore) {
			this.params.skip += this.params.limit
			this.params.first = 0
			this.getList()
		} else{
			uni.showToast({
				title: '没有更多了',
				icon: 'none'
			})
		}
		
	},
	methods: {
		getList() {
			this.request({
				url: `image/v1/wallpaper/album/${this.id}/wallpaper`,
				data: this.params
			}).then(res => {
				console.log(res)
				// album是对象，所以判断有没有数据的方式可以用Object.keys
				if (Object.keys(this.album).length === 0) {
					this.album = res.res.album
				}
				if (res.res.wallpaper.length === 0) {
					this.hasMore = false
					return
				}
				this.wallpaper = [...this.wallpaper, ...res.res.wallpaper]
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.album-top-bg{
	position: relative;
	.bg-des{
		position: absolute;
		width: 100%;
		height: 100rpx;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
		padding: 0 20rpx;
		.des-name{
			font-size: 40rpx;
		}
		.bg-btn{
			width: 140rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			background-color: $color;
			border-radius: 8rpx;
		}
	}
}
.album-author-wrap{
	padding: 20rpx;
	.author-info{
		display: flex;
		align-items: center;
		image{
			width: 60rpx;
		}
		.author-name{
			margin-left: 16rpx;
			font-weight: bold;
		}
	}
	.author-des{
		margin-top: 16rpx;
	}
}
.album-list{
	display: flex;
	flex-wrap: wrap;
	.album-item{
		width: (100% / 3);
		height: 140rpx;
		image{
			border: 2rpx solid #FFFFFF;
			height: 140rpx;
		}
	}
}
</style>
