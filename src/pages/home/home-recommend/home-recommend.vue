<template>
	<scroll-view 
	scroll-y 
	@scrolltolower="handleToLower"
	class="recommend-view" 
	v-if="recommend.length">
		<!-- 推荐 -->
		<view class="recommend-wrap">
			<view
			class="recommend-item"
			v-for="item in recommend"
			:key="item.id">
				<image :src="item.thumb" mode="widthFix"></image>
			</view>
		</view>
		<!-- 月份 -->
		<view class="months-wrap">
			<view class="months-title">
				<view class="title-text">
					<view class="text-left">
						<text>{{months.DD}}</text>
						/{{months.MM}}月
					</view>
					<view class="text-right">
						{{months.title}}
					</view>
				</view>
				<view class="title-more">更多&gt;</view>
			</view>
			<view class="months-content">
				<view 
				class="content-item"
				v-for="(item, index) in months.items"
				:key="item.id">
					<go-detail :list="months.items" :index="index">
						<!-- 这里后台接口设置的就是可以在前端控制图片高度 -->
						<image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>','360')"></image>
					</go-detail>
				</view>
			</view>
		</view>
		<!-- 热门 -->
		<view class="hots-wrap">
			<view class="hots-title">
				<text>热门</text>
			</view>
			<view class="hots-content">
				<view 
				class="hots-item"
				v-for="(item, index) in hots"
				:key="item.id">
					<go-detail :list="hots" :index="index">
						<image mode="aspectFill" :src="item.thumb"></image>
					</go-detail>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import moment from 'moment'
// @代表src目录
import goDetail from '@/components/goDetail.vue'
export default {
	components: {
		goDetail
	},
	data() {
		return {
			// 推荐
			recommend: [],
			// 月份
			months: {},
			// 热门
			hots: [],
			// 请求参数
			params: {
				limit: 30,
				order: 'hot',
				skip: 0
			},
			// 是否还有更多热门数据
			isMore: true
		}
	},
	async mounted() {
		// 动态修改页面标题
		uni.setNavigationBarTitle({
		    title: '首页'
		})
		
		const result = await this.getHotsList()
		
		// 推荐
		this.recommend = result.res.homepage[1].items
		
		// 月份
		this.months = result.res.homepage[2]
		// 格式化时间使用第三方插件 moment.js
		this.months.MM = moment(this.months).format("MM")
		this.months.DD = moment(this.months).format("DD")
		
		// 热门
		this.hots = result.res.vertical
	},
	methods: {
		// 获取热门数据
		getHotsList() {
			return	this.request({
				url: 'image/v3/homepage/vertical',
				data: this.params
			})
		},
		// 屏幕滑动至底部后获取更多热门数据
		async handleToLower() {
			if (this.isMore) {
				this.params.skip += this.params.limit
				const moreResult = await this.getHotsList()
				const moreHots = moreResult.res.vertical
				if (moreHots.length === 0) {
					this.isMore = false
				}
				// 数组拼接
				this.hots = [...this.hots, ...moreHots]
			} else{
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
	.recommend-view{
		height: calc(100vh - 36rpx);
	}
	.recommend-wrap{
		display: flex;
		flex-wrap: wrap;
		.recommend-item{
			width: 50%;
		}
	}
	.months-wrap{
		.months-title{
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			.title-text{
				display: flex;
				font-size: 30rpx;
				font-weight: bold;
				.text-left{
					color: $color;
					text{
						font-size: 36rpx
					}
				}
				.text-right{
					color: #666666;
					line-height: 50rpx;
					font-size: 32rpx;
					margin-left: 20rpx;
				}
			}
			.title-more{
				color: $color;
			}
		}
		.months-content{
			display: flex;
			flex-wrap: wrap;
			.content-item{
				width: (100%/3);
			}
		}
	}
	.hots-wrap{
		.hots-title{
			padding: 20rpx;
			text{
				font-size: 32rpx;
				font-weight: bold;
				padding-left: 10rpx;
				border-left: 10rpx solid $color;
			}
		}
		.hots-content{
			display: flex;
			flex-wrap: wrap;
			.hots-item{
				width: (100%/3);
			}
		}
	}
</style>
