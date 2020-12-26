<template>
	<view>
		<!-- 用户信息 -->
		<view class="user-info">
			<view class="user-avatar">
				<template v-if="imgDetail.user.avatar">
					<image mode="widthFix" :src="imgDetail.user.avatar"></image>
				</template>
				<template v-else>
					<image mode="widthFix" src="../../static/avatar.png"></image>
				</template>
			</view>
			<view class="user-des">
				<view class="user-name">{{imgDetail.user.name}}</view>
				<view class="user-time">{{imgDetail.cnTime}}</view>
			</view>
		</view>
		<!-- 图片 -->
		<swiper-action @swiperAction="handleSwiperAction">
			<view v-if="Object.keys(imgDetail).length" class="high-img">
				<!-- 直接这样写会报错 Cannot read property 'replace' of undefined"，因为页面渲染到这里时数据还没加载好 -->
				<!-- 所以在前面加上 v-if="Object.keys(imgDetail).length" -->
				<image mode="widthFix" :src="imgDetail.thumb"></image>
			</view>
		</swiper-action>
		<!-- 评论 -->
		<view class="comment-title">
			<text class="iconfont iconMicon-pinglun"></text>
			最新评论
		</view>
		<template v-if="comment.length">
			<view
			class="comment-item"
			v-for="item in comment"
			:key="item.id">
				<view class="comment-user">
					<view class="comment-avatar">
						<image mode="aspectFill" :src="item.user.avatar"></image>
					</view>
					<view class="comment-user-info">
						<view class="comment-name">{{item.user.name}}</view>
						<view class="comment-time">{{item.cnTime}}</view>
					</view>
				</view>
				<view class="comment-content">
					{{item.content}}
				</view>
			</view>
		</template>
		<template v-else>
			<view style="padding-left: 20rpx;">暂无评论</view>
		</template>
		<!-- 下载按钮 -->
		<view class="download-box">
			<view class="download-btn" @click="handleDownload">下载图片</view>
		</view>
	</view>
</template>

<script>
import moment from 'moment'
// 将文字都以中文显示
moment.locale('zh-cn')
import swiperAction from '../../components/swiperAction.vue'
export default {
	components: {
		swiperAction
	},
	data() {
		return {
			// 接收的数据放在这个对象
			imgDetail: {},
			// 最新评论
			comment: [],
			// 热门评论
			hot: [],
			// 图片index
			imgIndex: 0
		}
	},
	onLoad() {
		const { imgIndex } = getApp().globalData
		this.imgIndex = imgIndex
		this.getData()
	},
	methods: {
		// 获取页面数据
		getData() {
			const { imgList } = getApp().globalData
			this.imgDetail = imgList[this.imgIndex]
			// 格式化时间(*1000因为数据的单位是秒，需要的是毫秒)
			this.imgDetail.cnTime = moment(this.imgDetail.atime*1000).fromNow()
			// 获取评论数据
			this.getComment(this.imgDetail.id)
		},
		async getComment(id) {
			const res =  await this.request({ url: `image/v2/wallpaper/wallpaper/${id}/comment` })
			this.comment = res.res.comment
			// 改变时间格式
			this.comment.forEach(v => v.cnTime = moment(v.atime*1000).fromNow())
		},
		handleSwiperAction(e) {
			const { imgList } = getApp().globalData
			// 实现滑动翻页的原理是页面的数据主要由imgIndex控制，所以下一页就是imgIndex++
			if (e.direction === 'right' && this.imgIndex > 0) {
				// 右滑，imgIndex不能小于0
				this.imgIndex--
				this.getData()
			} else if (e.direction === 'left' && this.imgIndex < imgList.length - 1) {
				// 左滑，imgIndex不能大于数组最后一个的imgIndex
				this.imgIndex++
				this.getData()
			} else {
				uni.showToast({
					title: '不能继续滑动',
					icon: 'none'
				})
			}
		},
		async handleDownload() {
			// 下载中提示
			await uni.showLoading({ title: '下载中' })
			// 1. 将图片下载到内存中 tempFilePath，这是一个临时文件路径
			const [err, res] = await uni.downloadFile({ url: this.imgDetail.img1 })
			if (err) {
				await uni.hideLoading()
				uni.showToast({
					title: `下载失败，失败原因${err.errMsg}`,
					icon: 'none',
					duration: 3000
				})
				return console.log(err)
			}
			const { tempFilePath } = res
			// 2. 将 tempFilePath 中的临时文件下载到相册中
			await uni.saveImageToPhotosAlbum({ filePath: tempFilePath })
			// 3. 提示下载成功
			await uni.hideLoading()
			await uni.showToast({
				title: '下载成功'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.user-info{
	display: flex;
	padding: 20rpx;
	align-items: center;
	.user-avatar{
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 16rpx;
	}
	.user-des{
		.user-name{
			margin-bottom: 6rpx;
			font-weight: bold;
		}
		.user-time{
			color: #646464;
			font-size: 26rpx;
		}
	}
}
.comment-title{
	display: flex;
	align-items: center;
	padding: 20rpx;
	font-size: 32rpx;
	font-weight: bold;
	.iconfont{
		font-size: 28rpx;
		font-weight: normal;
		margin-right: 10rpx;
		color: $color;
	}
}
.comment-item{
	padding: 20rpx;
	margin-bottom: 120rpx;
	border-bottom: 1rpx solid #EEEEEE;
	.comment-user{
		display: flex;
		align-items: center;
		.comment-avatar{
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
			image{
				height: 100%;
			}
		}
		.comment-user-info{
			.comment-name{
				color: #666666;
			}
			.comment-time{
				color: #333333;
			}
		}
	}
	.comment-content{
		margin-top: 16rpx;
	}
}
.download-box{
	position: fixed;
	background-color: #FFFFFF;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 120rpx;
	@include flex-center;
	.download-btn{
		width: 90%;
		height: 80%;
		background-color: $color;
		color: #FFFFFF;
		font-size: 32rpx;
		font-weight: bold;
		@include flex-center
	}
}
</style>
