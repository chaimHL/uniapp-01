<template>
	<view>
		<!-- tab标题 -->
		<view class="tab-title">
			<view class="tab-inner">
				<uni-segmented-control
				:current="current" 
				:values="items.map(v=>v.title)" 
				@clickItem="onClickItem" 
				style-type="text" 
				active-color="#409EFF"></uni-segmented-control>
			</view>
			<!-- 搜索图标 -->
			<text class="iconfont iconsousuo"></text>
		</view>
		<!-- tab内容 -->
		<scroll-view enable-flex scroll-y class="tab-content" @scrolltolower="handleScrolltolower">
			<view 
			v-for="item in vertical"
			:key="item.id"
			class="img-category-item">
				<image :src="item.thumb" mode="widthFix"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { uniSegmentedControl } from '@dcloudio/uni-ui'
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					{ title: '最新', order: 'new' },
					{ title: '热门', order: 'hot' }
				],
				current: 0,
				// 接收的 url 参数
				id: 0,
				// 接口传参
				params: {
					limit: 30,
					skip: 0,
					order: 'new'
				},
				// 接口数据
				vertical: [],
				// 是否还有更多数据
				hasMore: true
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getList()
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				} else {
					// 点击的是相同的标签
					return
				}
				this.params.skip = 0
				this.vertical = []
				this.hasMore = true
				// 切换请求参数的 order
				this.params.order = this.items[e.currentIndex].order
				this.getList()
			},
			// 获取数据
			getList() {
				this.request({
					url: `image/v1/vertical/category/${this.id}/vertical`,
					data: this.params
				}).then(res => {
					if (res.res.vertical.length === 0) {
						this.hasMore = false
						uni.showToast({
							title: '没有更多了',
							icon: 'none'
						})
						return
					} 
					this.vertical = [...this.vertical, ...res.res.vertical]
				})
			},
			// 滚动触底加载更多
			handleScrolltolower() {
				if (this.hasMore) {
					this.params.skip += this.params.limit
					this.getList()
				} else {
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
.tab-title{
	position: relative;
	.tab-inner{
		width: 70%;
		margin: 0 auto;
	}
	.iconsousuo{
		position: absolute;
		right: 20rpx;
		top: 50%;
		transform: translateY(-50%);
	}
}
.tab-content{
	height: calc(100vh - 72rpx);
	display: flex;
	flex-wrap: wrap;
	.img-category-item{
		width: (100% / 3);
		border: 4rpx solid #FFFFFF;
	}
}
</style>
