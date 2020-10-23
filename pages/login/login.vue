<template>
	<view>
		<view style="height: 44px;"></view>
		<view
			class="flex align-center justify-center font-lg text-muted"
			style="margin-top: 100rpx;margin-bottom: 80rpx;"
		>
			欢迎回来
		</view>

		<view class="px-4">
			<input
				type="text"
				v-model="form.username"
				class="uni-input bg-light rounded mb-4"
				placeholder="手机号/用户名/邮箱"
			/>
			<input
				type="text"
				v-model="form.password"
				class="uni-input bg-light rounded mb-4"
				placeholder="请输入密码"
			/>
			<input
				v-if="type === 'reg'"
				type="text"
				v-model="form.repassword"
				class="uni-input bg-light rounded mb-4"
				placeholder="请输入确认密码"
			/>

			<view
				class="bg-main text-white flex align-center justify-center font-md py-2 rounded-circle"
				hover-class="bg-main-hover"
				@click="handleClick"
			>
				{{ type === 'login' ? '登 录' : '注 册' }}
			</view>
		</view>

		<view class="flex align-center justify-center pt-5">
			<view class="text-muted mx-2 font-sm" @click="changeType">
				{{ type === 'login' ? '注册账号' : '去登录' }}
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type: 'login',
			form: {
				username: '',
				password: '',
				repassword: ''
			}
		};
	},
	methods: {
		changeType() {
			this.type = this.type === 'login' ? 'reg' : 'login';
		},
		handleClick() {
			if (this.type === 'login') {
				uni.switchTab({
					url: '../index/index'
				});
			}
		}
	}
};
</script>

<style></style>