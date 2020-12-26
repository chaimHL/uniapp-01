<template>
	<view @click="handleClick">
		<slot></slot>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	props: {
		list: Array,
		index: Number
	},
	methods: {
		handleClick() {
			// 1. 将数据缓存
			getApp().globalData.imgList = this.list
			getApp().globalData.imgIndex = this.index
			// 2. 跳转页面
			uni.navigateTo({
				url: '/pages/imgDetail/imgDetail'
			})
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
