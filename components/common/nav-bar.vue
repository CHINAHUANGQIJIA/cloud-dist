<template>
	<view>
		<view class="fixed-top bg-white">
			<uni-status-bar></uni-status-bar>
			<view style="height: 44px;" class="flex border-bottom align-center">
				<view class="flex-1 flex"><slot name="left"></slot></view>
				<view class="flex-1 flex justify-center"><slot></slot></view>
				<view class="flex-1 flex justify-end"><slot name="right"></slot></view>
			</view>
		</view>
		<!-- 占位 -->
		<view>
			<uni-status-bar></uni-status-bar>
			<view style="height: 44px;"></view>
		</view>
	</view>
</template>

<script>
import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
export default {
	components: {
		uniStatusBar
	}
};
</script>

<style></style>
