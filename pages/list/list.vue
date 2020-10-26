<template>
	<view style="height: 100vh;" class="flex flex-column">
		<view class="flex border-bottom border-light-secondary" style="height: 100rpx;">
			<view
				class="flex-1 flex flex-column align-center justify-center"
				v-for="(item, index) in tabBars"
				:key="index"
				:class="index === tabIndex ? 'text-main' : ''"
				@click="changeTab(index)"
			>
				0
				<text class="font-md">{{ item.name }}</text>
				<text
					style="height: 8rpx;width: 140rpx;"
					class="rounded"
					:class="tabIndex === index ? 'bg-main' : 'bg-white'"
				></text>
			</view>
		</view>
		<!-- swiper内容随着上面的tab切换联动 -->
		<swiper :duration="250" class="flex-1 flex" :current="tabIndex" @change="changeTab($event.detail.current)">
			<swiper-item class="flex-1 flex" v-for="(item, index) in tabBars" :key="index">
				<scroll-view scroll-y="true" class="flex-1">
					<template v-if="index === 0">
						<view style="height: 60rpx;" class="bg-light flex align-center font-sm px-2 text-muted">
							文件下载至:_doc/uniapp_temp_1603680037252/download/
						</view>
						<view class="p-2 border-bottom border-light-secondary font text-muted">
							下载中{{ downing.length }}
						</view>
						<f-list v-for="(item, index) in downing" :key="'i' + index" :item="item" :index="index">
							<view style="height: 70rpx;" class="flex align-center text-main">
								<text class="iconfont icon-zanting"></text>
								<text class="ml-1">{{ item.progress }}</text>
							</view>
							<progress
								slot="bottom"
								:percent="item.progress"
								activeColor="#009CFF"
								:stroke-width="4"
							></progress>
						</f-list>
						<view class="p-2 border-bottom border-light-secondary font text-muted">
							下载完成{{ downed.length }}
						</view>
						<f-list
							v-for="(item, index) in downed"
							:key="'d' + index"
							:item="item"
							:index="index"
							:showRight="false"
						></f-list>
					</template>
					<template v-else>
						<view class="p-2 border-bottom border-light-secondary font text-muted">
							上传中{{ uploading.length }}
						</view>
						<f-list v-for="(item, index) in uploading" :key="'i' + index" :item="item" :index="index">
							<view class="flex align-center text-main" style="height: 70rpx;">
								<text class="iconfont icon-zanting"></text>
								<text class="ml-1">{{ item.progress }}%</text>
							</view>
							<!-- 进度条时间，percent属性绑定下载百分比 -->
							<progress
								slot="bottom"
								:percent="item.progress"
								activeColor="#009CFF"
								:stroke-width="4"
							></progress>
						</f-list>

						<view class="p-2 border-bottom border-light-secondary font text-muted">
							上传完成({{ uploaded.length }})
						</view>
						<f-list
							v-for="(item, index) in uploaded"
							:key="'d' + index"
							:item="item"
							:index="index"
							:showRight="false"
						></f-list>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
import fList from '@/components/common/f-list.vue';
import { mapState } from 'vuex';
export default {
	components: {
		fList
	},
	data() {
		return {
			tabIndex: 0,
			tabBars: [
				{
					name: '下载列表'
				},
				{
					name: '上传列表'
				}
			],
			list: [
				{
					type: 'image',
					name: '风景.jpg',
					data:
						'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3311552614,3643030730&fm=26&gp=0.jpg',
					create_time: '2019-13-14 00:00',
					download: 100
				},
				{
					type: 'image',
					name: '风景.jpg',
					data:
						'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3311552614,3643030730&fm=26&gp=0.jpg',
					create_time: '2019-13-14 00:00',
					download: 50
				}
			]
		};
	},
	computed: {
		...mapState({
			uploadList: state => state.uploadList
		}),
		uploading() {
			return this.uploadList.filter(item => {
				return item.progress < 100;
			});
		},
		uploaded() {
			return this.uploadList.filter(item => {
				return item.progress === 100;
			});
		},
		downing() {
			return this.list.filter(item => {
				return item.download < 100;
			});
		},
		downed() {
			return this.list.filter(item => {
				return item.download === 100;
			});
		},
	},
	methods: {
		changeTab(index) {
			this.tabIndex = index;
		}
	}
};
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
