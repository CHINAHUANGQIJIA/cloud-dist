<template>

<!-- 全选 -->
	<!-- 封装自定义的全局弹出层。通过ref用dom元素 -->
	<uni-popup ref="dialog">
		<!-- 弹出层最外层容器样式 -->
		<view style="width: 600rpx;" class="bg-white rounded">
			<!-- 弹出层标题样式，标题内容通过组件传过去 -->
			<view class="flex align-center justify-center font-weight-bold border-bottom border-light-secondary" style="height: 100rpx;">{{ title }}</view>
			<!-- 弹出层的内容，通过插槽分发，这样可以在父组件中随意给定各种内容 -->
			<view class="flex align-center justify-center p-3"><slot></slot></view>
			<!-- 确定和取消区域，用@tap事件更贴合手机端操作，上面显示的文字也可以通过props传递，更灵活 -->
			<view class="flex border-top border-light-secondary" style="height: 100rpx;">
				<view class="flex-1 text-muted flex align-center justify-center" @tap="cancel">{{ cancelText }}</view>
				<view class="flex-1 text-main flex align-center justify-center" @tap="confirm">{{ confirmText }}</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
// 引入基础的popup组件
import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
export default {
	components: {
		uniPopup
	},
	// 父组件可以传递弹出层的标题，确定和取消区域的文字，不传就默认值
	props: {
		title: {
			type: String,
			default: '提示'
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		confirmText: {
			type: String,
			default: '确定'
		}
	},
	data() {
		return {
			// 是否需要回调函数，默认不需要
			callback: false
		};
	},
	methods:{
		open(callback = false) {
			this.callback= callback;
			this.$refs.dialog.open();
		},
		cancel() {
			// 向父组件传递cancel事件，同时关闭对话框
			this.$emit('cancel');
			this.$refs.dialog.close()
		},
		confirm() {
			// 如果需要回调，表示暂时不关闭，则将当前对象的cancel传递
			if (typeof this.callback === 'function') {
				this.callback(() => {
					this.cancel();
				})
			}else{
				// 向父组件传递confirm事件
				this.$emit('confirm');
				this.cancel();
			}
		}
	}
};
</script>

<style></style>
