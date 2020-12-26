export default (params) => {
	// 加载中效果
	uni.showLoading({
	    title: '加载中'
	})
	
	// 定义公共的url
	const baseUrl = 'http://157.122.54.189:9088/'
	
	return new Promise((resolve, reject) => {
		wx.request({
			...params,
			url: baseUrl + params.url,
			success(res) {
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}