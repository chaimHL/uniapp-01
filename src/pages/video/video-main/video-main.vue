<template>
	<view>1-4</view>
</template>

<script>
	export default {
		props: {
			urlobj: Object
		},
		mounted() {
			this.getList()
		},
		watch: {
			urlobj() {
				this.getList()
			}
		},
		methods: {
			getList() {
				this.request({
					url: this.urlobj.url,
					data: this.urlobj.params
				})
			}
		}
	}
</script>

<style>
</style>
