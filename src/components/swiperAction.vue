<!-- 滑动组件 -->
<template>
	<view @touchstart="handleTouchstart" @touchend="handleTouchend">
		<slot></slot>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 按下时的坐标
			startX: 0,
			startY: 0,
			// 按下的时间
			startTime: 0
		}
	},
	methods: {
		// 手指按下
		handleTouchstart(event) {
			this.startX = event.changedTouches[0].clientX
			this.startY = event.changedTouches[0].clientY
			this.startTime = Date.now()
		},
		// 手指离开
		handleTouchend(event) {
			const endX = event.changedTouches[0].clientX
			const endY = event.changedTouches[0].clientY
			const endTime = Date.now()
			// 先验证持续时间，手指在屏幕上时间大于3s则无效
			if (endTime - this.startTime > 3000) {
				return
			}
			// 滑动方向
			let direction = ''
			// 验证手指移动距离，如果水平距离的绝对值大于10，且垂直方向小于10（不然就是上下滑动了），则有效
			if (Math.abs(endX - this.startX) > 10 && Math.abs(endY - this.startY < 10)) {
				direction = endX - this.startX > 0 ? 'right' : 'left'
			} else{
				return
			}
			// 把direction放在一个对象里方便以后拓展
			this.$emit('swiperAction', { direction })
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
