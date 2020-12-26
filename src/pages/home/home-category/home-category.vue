<template>
	<view class="cate-list-box">
		<navigator 
		class="cate-list-item" 
		v-for="item in category"
		:key="item.id"
		:url="`/pages/imgCategory/imgCategory?id=${item.id}`">
			<image mode="aspectFill" :src="item.cover"></image>
			<view class="cate-text">{{item.name}}</view>
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {
			category: []
		}
	},
	mounted() {
		uni.setNavigationBarTitle({
		    title: '分类'
		})
		// 获取数据
		this.getList()
	},
	methods: {
		async getList() {
			const res = await this.request({ url: 'image/v1/vertical/category' })
			this.category = res.res.category
		}
	}
}
</script>

<style lang="scss" scoped>
	.cate-list-box{
		display: flex;
		flex-wrap: wrap;
		.cate-list-item{
			width: (100% / 3);
			position: relative;
			border: 4rpx solid #FFFFFF;
			image{
				height: 240rpx;
			}
			.cate-text{
				position: absolute;
				background-image: linear-gradient(to right top, rgba(0,0,0,.2), rgba(0,0,0,0));
				height: 50rpx;
				width: 100%;
				color: #FFFFFF;
				left: 0;
				bottom: 0;
				display: flex;
				align-items: center;
				padding-left: 12rpx;
			}
		}
	}
</style>
