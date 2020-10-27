<template>
	<view>
		<!-- 自定义导航栏 -->
		<nav-bar><view slot="left" class="font-md ml-3 text-primary" @click="back">取消</view></nav-bar>
		<!-- 列表 -->
		<f-list v-for="(item, index) in list" :key="index" :item="item" :index="index" @select="select"></f-list>

		<!-- 底部操作条 -->
		<view v-if="checkList.length > 0">
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
import navBar from '@/components/common/nav-bar.vue';
import fList from '@/components/common/f-list.vue';
export default {
	components: {
		navBar,
		fList
	},
	data() {
		return {
			key: '',
			list: [
				{
					type: 'dir',
					name: '我的笔记',
					created_time: '2019-12-15 08:00',
					checked: true
				}
			]
		};
	},
	onLoad(e) {
		this.authMethod(() => {
			this.key = e.key;
			this.getData();
		});
	},
	computed: {
		// 选中列表
		checkList() {
			return this.list.filter(item => item.checked);
		},
		// 操作菜单
		actions() {
			return [
				{
					icon: 'icon-xiazai',
					name: '保存'
				}
			];
		}
	},
	methods: {
		formatList(list) {
			return list.map(item => {
				let type = 'none';
				if (item.isdir === 1) {
					type = 'dir';
				} else {
					type = item.ext.split('/')[0] || 'none';
				}
				return {
					type,
					checked: true,
					...item
				};
			});
		},
		getData() {
			this.$H
				.get('/share/' + this.key, {
					token: true
				})
				.then(res => {
					this.list = this.formatList(res);
				});
		},
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 选中列表
		select(e) {
			this.list[e.index].checked = e.value;
		},

		// 处理底部操作条事件
		handleBottomEvent(item) {
			if (this.checkList.length === 0) {
				return uni.showToast({
					title: '请选择要保存的文件',
					icon: 'none'
				});
			}
			uni.navigateTo({
				url: '../save/save?key=' + this.key
			});
		}
	}
};
</script>

<style></style>
