<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			base: 'www.heihei.com'
		}
	}
</script>

<style>
/*每个页面公共css */
@import "./styles/base.wxss";
@import "./styles/iconfont/iconfont.wxss"
</style>
