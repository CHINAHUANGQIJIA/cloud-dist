<template>
	<view>
		<view class="p-3 flex align-center">
			<image :src="user.avatar" style="width: 120rpx;height: 120rpx;" class="rounded-circle flex-shrink mr-3"></image>
			<view class="flex-1 flex flex-column text-muted font">
				<view class="flex align-end">
					<text class="font-lg text-dark mr-2">{{ user.nickname || user.nickname }}</text>
					{{ user.sex }}
				</view>
				<text class="text-ellipsis">{{ user.desc || '暂时无描述...' }}</text>
			</view>
		</view>
		<view class="bg-light" style="height: 20rpx;"></view>
		<view class="p-3">
			<progress class="mb-3" :percent="progress" active stroke-width="3" />
			<view class="flex align-center justify-between font">
				<text class="text-light-muted">总：{{ user.total_size | bytesToSize }}</text>
				<text class="text-warning">已用：{{ user.used_size | bytesToSize }}</text>
			</view>
		</view>
		<view class="bg-light" style="height: 20rpx;"></view>
		<view class="flex justify-between p-3">
			<text class="text-muted font">设置</text>
			<image src="../../static/enter.png" mode="" style="width:40rpx;height: 40rpx;"></image>
		</view>

		<view class="position-fixed fixed-bottom bg-main text-white flex align-center justify-center font-md py-2 rounded-circle" hover-class="bg-main-hover" @click="logout">
			退出登录
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {};
	},
	onLoad() {
		console.log(this.$store.state.user);
	},
	computed: {
		// mapState是Vuex的一个辅助函数，返回的是一个对象，可以帮助我们生成计算属性
		...mapState({
			user: state => state.user
		}),
		// progress计算属性用来实时显示用户空间使用率
		progress() {
			if (this.user.total_size === 0) {
				return 0;
			}
			return (this.user.used_size / this.user.total_size) * 100;
		}
	},
	onShow() {
		// 每次进入页面，都要获取用户的空间大小
		this.getSize();
	},
	methods: {
		// 请求接口，获得最新的空间大小，并提交给Vuex更新
		getSize() {
			this.$H.get('/getsize', { token: true }).then(res => {
				this.$store.dispatch('updateSize', res);
			});
		},
		logout() {
			// 调用Vuex的logout，不需要直接在这里调用接口，在Vuex例异步调用即可
			this.$store.dispatch('logout').then(res => {
				uni.showToast({
					title: '退出成功',
					icon: 'none'
				});
			});
		}
	},
	filters: {
		bytesToSize(bytes) {
			if (bytes === 0) return '0 KB';
			var k = 1024,
				sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
				i = Math.floor(Math.log(bytes) / Math.log(k));

			return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
		}
	}
};
</script>

<style scoped>
.bottom {
	position: fixed;
	bottom: 0;
}
</style>
