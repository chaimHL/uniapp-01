<template>
	<view>
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
				<view v-if="current === 0">
					<home-recommend></home-recommend>
				</view>
				<view v-if="current === 1">
					<home-category></home-category>
				</view>
				<view v-if="current === 2">
					<home-new></home-new>
				</view>
				<view v-if="current === 3">
					<home-album></home-album>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { uniSegmentedControl } from '@dcloudio/uni-ui'
import homeRecommend from './home-recommend/home-recommend.vue'
import homeCategory from './home-category/home-category.vue'
import homeNew from './home-new/home-new.vue'
import homeAlbum from './home-album/home-album.vue'

export default {
	components: {
		homeRecommend,
		homeCategory,
		homeNew,
		homeAlbum,
		uniSegmentedControl
	},
	data() {
		return {
			items: [
				{ title: '推荐' },
				{ title: '分类' },
				{ title: '最新' },
				{ title: '专辑' }
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
	},
	async onLoad() {
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
