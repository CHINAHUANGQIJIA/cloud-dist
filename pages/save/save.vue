<template>
	<view>
		<view class="bg-light flex align-center">
			<view class="px-2 py-2 text-secondary" hover-class="bg-hover-light" @click="handleBreadcrumb({ id: 0 })">
				根目录
			</view>
			<block v-for="(item, index) in dirs" :key="index">
				<view class="py-2">/</view>
				<view class="px-2 py-2 text-secondary" hover-class="bg-hover-light" @click="handleBreadcrumb(item)">
					{{ item.name }}
				</view>
			</block>
		</view>

		<!-- 列表 -->
		<f-list
			v-for="(item, index) in list"
			:key="index"
			:item="item"
			:index="index"
			:showRight="false"
			@click="handleClick(item)"
		></f-list>

		<!-- 底部操作条 -->
		<view>
			<view style="height: 115rpx;"></view>
			<view style="height: 115rpx;" class="flex align-stretch bg-primary text-white fixed-bottom">
				<view
					class="flex-1 flex flex-column align-center justify-center"
					style="line-height: 1.5;"
					v-for="(item, index) in actions"
					:key="index"
					hover-class="bg-hover-primary"
					@click="handleBottomEvent(item)"
				>
					<text class="iconfont" :class="item.icon"></text>
					{{ item.name }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import fList from '@/components/common/f-list.vue';
export default {
	components: {
		fList
	},
	data() {
		return {
			key: '',
			list: [],
			dirs: []
		};
	},
	onLoad(e) {
		this.key = e.key;
		this.getData();
	},
	computed: {
		// 操作菜单
		actions() {
			return [
				{
					name: '选定目录'
				}
			];
		},
		file_id() {
			let l = this.dirs.length;
			if (l === 0) {
				return 0;
			}
			return this.dirs[l - 1].id;
		}
	},
	methods: {
		handleBreadcrumb(item) {
			console.log(item);
			if (item.id === 0) {
				this.dirs = [];
				this.getData();
			} else {
				let i = this.dirs.findIndex(v => v.id === item.id);
				if (i !== -1) {
					this.dir = {
						id: this.dirs[i].id,
						name: this.dirs[i].name
					};
					this.dirs = this.dirs.filter((v, index) => {
						return index <= i;
					});
					this.getData();
				}
			}
		},
		handleClick(e) {
			this.dirs.push({
				id: e.id,
				name: e.name
			});
			this.getData();
		},
		getData() {
			this.$H
				.get(`/file?file_id=${this.file_id}&isdir=1`, {
					token: true
				})
				.then(res => {
					this.list = res.map(item => {
						item.type = 'dir';
						return item;
					});
				});
		},
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 处理底部操作条事件
		handleBottomEvent(item) {
			this.$H
				.post(
					'/share/save_to_self',
					{
						dir_id: this.file_id,
						sharedurl: this.key
					},
					{
						token: true
					}
				)
				.then(res => {
					uni.showToast({
						title: '保存成功',
						icon: 'none'
					});
					uni.$emit('updateData', {});
					uni.switchTab({
						url: '../index/index'
					});
				});
		}
	}
};
</script>

<style></style>
