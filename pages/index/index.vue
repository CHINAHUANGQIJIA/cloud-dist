<template>
	
		<!-- 自定义导航栏 -->
		<view>
			<uni-status-bar></uni-status-bar>
			<view style="height: 44px;" class="flex border-bottom align-center">
				<view class="flex-1 flex">
					<text class="font-md ml-3">首页</text>
				</view>
				<view class="flex-1 flex justify-center"></view>
				<view class="flex-1 flex justify-end">
					<view style="width: 60rpx; height: 60rpx;" class="flex align-center justify-center bg-light rounded-circle mr-3">
						<text class="iconfont icon-zengjia"></text>
					</view>
					<view style="width: 60rpx; height: 60rpx;" class="flex align-center justify-center bg-light rounded-circle mr-3">
						<text class="iconfont icon-gengduo"></text>
					</view>
				</view>
			</view>
		</view>
	
</template>

<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue'
	export default {
		components: {
			uniStatusBar
		},
		data() {

			return {

			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
