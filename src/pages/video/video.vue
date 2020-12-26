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
		<view class="tab-content">
			<view v-if="current<4">
				<video-main :urlobj="{url: items[current].url, params: items[current].params}"></video-main>
			</view>
			<view v-else>
				<video-category></video-category>
			</view>
		</view>
	</view>
</template>

<script>
	import { uniSegmentedControl } from '@dcloudio/uni-ui'
	import videoMain from './video-main/video-main.vue'
	import videoCategory from './video-category/video-category.vue'
	
	export default {
		components: {
			uniSegmentedControl,
			videoMain,
			videoCategory
		},
		data() {
			return {
				items: [
					{ title: '推荐', url: 'videoimg/v1/videowp/featured', params: { limit: 30, skip: 0, order: 'hot' } },
					{ title: '娱乐', url: 'videoimg/v1/videowp/category/59b25abbe7bce76bc834198a', params: { limit: 30, skip: 0, order: 'new' } },
					{ title: '最新', url: 'videoimg/v1/videoimg/v1/videowp/videowp', params: { limit: 30, skip: 0, order: 'new' } },
					{ title: '热门', url: 'videoimg/v1/videowp/videowp', params: { limit: 30, skip: 0, order: 'hot' } },
					{ title: '分类', url: 'videoimg/v1/videowp/category', params: {} }
				],
				current: 0
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
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
</style>
