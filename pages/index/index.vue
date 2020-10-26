<template>
	<view>
		<!-- 自定义导航栏 -->
		<nav-bar>
			<template v-if="checkCount === 0">
				<!-- 插槽再一次发挥逆天作用，进入子目录，左边将变成返回箭头，导航栏变成子目录名称 -->
				<template slot="left">
					<view
						style="width: 60rpx;height: 60rpx;"
						class="flex align-center justify-center bg-light rounded-circle ml-3"
						hover-class="bg-hover-light"
						@tap="backUp"
						v-if="current"
					>
						<text class="iconfont icon-fanhui"></text>
					</view>
					<text class="font-md ml-3">{{ current ? current.name : '首页' }}</text>
				</template>
				<template slot="right">
					<view
						style="width: 60rpx;height: 60rpx;"
						class="flex align-center justify-center bg-light rounded-circle mr-3"
						hover-class="bg-hover-light"
						@tap="openAddDialog"
					>
						<text class="iconfont icon-zengjia"></text>
					</view>
					<view
						style="width: 60rpx;height: 60rpx;"
						class="flex align-center justify-center bg-light rounded-circle mr-3"
						hover-class="bg-hover-light"
						@click="openSortDialog"
					>
						<text class="iconfont icon-gengduo"></text>
					</view>
				</template>
			</template>

			<template v-else>
				<view slot="left" class="font-md ml-3 text-primary" @click="handleCheckAll(false)">取消</view>
				<text class="font-md font-weight-bold">已选中{{ checkCount }}个</text>
				<view slot="right" class="font-md mr-3 text-primary" @click="handleCheckAll(true)">全选</view>
			</template>
		</nav-bar>

		<!-- 搜索框 -->
		<view class="px-3 py-2">
			<view class="position-relative">
				<view style="height: 70rpx;width: 70rpx;position: absolute;top: 0;left: 0;" class="flex align-center justify-center text-light-muted">
					<text class="iconfont icon-sousuo"></text>
				</view>
				<input style="height: 70rpx;padding-left: 70rpx;" type="text" class="bg-light font-md rounded-circle" placeholder="搜索网盘文件" @input="search" />
			</view>
		</view>

		<!-- 列表 -->
		<f-list v-for="(item, index) in list" :key="index" :item="item" :index="index" @select="select" @click="doEvent(item)"></f-list>

		<!-- 底部操作条 -->
		<!-- 选中个数大于0才会出现这个操作条 -->
		<view v-if="checkCount > 0">
			<!-- 这里要留一定的高度，因为底部操作条需要被固定在底部，并空出底部tarbar高的地方 -->
			<view style="height: 115rpx;"></view>
			<!-- 操作条容器的样式，高度，颜色，固定在底部，处置方向拉升效果 -->
			<view style="height: 115rpx;" class="flex align-stretch bg-primary text-white fixed-bottom">
				<!-- 根据元素个数等分容器，所以要么四个等分，要么两个等分，行高的修改可以让图标和文字之间的距离变得合理，点击还会变色：hover-class -->
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

		<!-- 是否要删除 -->
		<f-dialog ref="delete">是否删除选中的文件？</f-dialog>

		<!-- 重命名,通过ref定义不同的对话框对象，不同操作弹出的dialog的不同的对象 -->
		<f-dialog ref="rename"><input type="text" v-model="renameValue" class="flex-1 bg-light rounded px-2" style="height: 95rpx;" placeholder="重命名" /></f-dialog>

		<!-- 新建文件夹，使用自定义弹出框，使用input作为插槽，绑定data中的newdirname变量 -->
		<f-dialog ref="newdir"><input type="text" v-model="newdirname" class="flex-1 bg-light rounded px-2" style="height: 95rpx;" placeholder="新建文件夹名称" /></f-dialog>

		<!-- 添加操作条，应当能理解这里ref的作用了，type标识弹出的未知类型，具体取值都在popup子组件中 -->
		<uni-popup ref="add" type="bottom">
			<view class="bg-white flex" style="height: 200rpx;">
				<view class="flex-1 flex align-center justify-center flex-column" hover-class="bg-light" v-for="(item, index) in addList" :key="index" @tap="handleAddEvent(item)">
					<!-- 每个操作的图标，可以传入图标的名称和颜色，很灵活 -->
					<text
						style="width: 110rpx;height: 110rpx;"
						class="rounded-circle bg-light iconfont flex align-center justify-center"
						:class="item.icon + ' ' + item.color"
					></text>
					<!-- 每个操作的名称 -->
					<text class="font text-muted">{{ item.name }}</text>
				</view>
			</view>
		</uni-popup>

		<!-- 排序框，底部弹出，遍历排序操作数组，为当前索引项绑定文字蓝色样式 -->
		<uni-popup ref="sort" type="bottom">
			<view class="bg-white">
				<view
					v-for="(item, index) in sortOptions"
					:key="index"
					class="flex align-center justify-center py-3 font border-bottom border-light-secondary"
					:class="index === sortIndex ? 'text-main' : 'text-dark'"
					hover-class="bg-light"
					@click="changeSort(index)"
				>
					{{ item.name }}
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import navBar from '@/components/common/nav-bar.vue';
import fList from '@/components/common/f-list.vue';
import fDialog from '@/components/common/f-dialog.vue';
import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
export default {
	components: {
		navBar,
		fList,
		fDialog,
		uniPopup
	},
	data() {
		return {
			dirs: [],
			sortIndex: 0,
			sortOptions: [
				{
					name: '按名称排序',
					key: 'name'
				},
				{
					name: '按时间排序',
					key: 'created_time'
				}
			],
			renameValue: '',
			newdirname: '',
			list: [],
			addList: [
				{
					icon: 'icon-file-b-6',
					color: 'text-success',
					name: '上传图片'
				},
				{
					icon: 'icon-file-b-9',
					color: 'text-primary',
					name: '上传视频'
				},
				{
					icon: 'icon-file-b-8',
					color: 'text-muted',
					name: '上传文件'
				},
				{
					icon: 'icon-file-b-2',
					color: 'text-warning',
					name: '新建文件夹'
				}
			]
		};
	},
	onLoad() {
		let dirs = uni.getStorageSync('dirs');
		if (dirs) {
			this.dirs = JSON.parse(dirs);
		}
		// 初始化数据
		this.getData();
	},
	methods: {
		// 将数据格式转化为我们需要显示的样子，不同的文件类型，是否选中
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
					checked: false,
					...item
				};
			});
		},
		getData() {
			let orderby = this.sortOptions[this.sortIndex].key;
			this.$H
				.get(`/file?file_id=${this.file_id}&orderby=${orderby}`, {
					token: true
				})
				.then(res => {
					this.list = this.formatList(res.rows);
				});
		},
		//列表点击事件
		doEvent(item) {
			switch (item.type) {
				case 'image': //预览图片
					let images = this.list.filter(item => {
						return item.type === 'image';
					});
					uni.previewImage({
						current: item.url,
						urls: images.map(item => item.url)
					});
					break;
				case 'video':
					uni.navigateTo({
						url: '../video/video?url=' + item.u + '&title=' + item.name
					});
					break;
				default:
					this.dirs.push({
						id: item.id,
						name: item.name
					});
					this.getData();
					uni.setStorage({
						key: 'dirs',
						data: JSON.stringify(this.dirs)
					});
					break;
			}
		},
		//切换顺序
		changeSort(index) {
			this.sortIndex = index;
			this.getData();
			this.$refs.sort.close();
		},
		openSortDialog() {
			this.$refs.sort.open();
		},
		select(e) {
			//接收到子组件传递过来的索引选中状态，将对应的list中的数据更新
			this.list[e.index].checked = e.value;
			// 自己的方式实现多选操作——根据选中的元素数量切换顶部导航样式
			// if (e.value === true){
			// 	this.count = this.count + 1
			// } else {
			// 	this.count = this.count - 1
			// }
			// console.log(this.count);
		},
		// 自己的方式实现全选
		selectAll() {
			let length = this.list.length;
			for (let i = 0; i < length; i++) {
				this.list[i].checked = true;
			}
		},
		// 自己的方式实现取消全选
		cancelAll() {
			let length = this.list.length;
			for (let i = 0; i < length; i++) {
				this.list[i].checked = false;
			}
		},
		//处理底部操作条事件，这里仅对“删除”做了处理
		handleBottomEvent(item) {
			switch (item.name) {
				case '删除':
					this.$refs.delete.open(close => {
						//加载框过滤下
						uni.showLoading({
							title: '删除中...',
							mask: false
						});
						//删除接口需要传“1,2,3”这样的参数形式，所以用map取出checkList中每条数据的id，然后用join拼接上逗号
						let ids = this.checkList.map(item => item.id).join(',');
						this.$H
							.post(
								'/file/delete',
								{
									ids
								},
								{ token: true }
							)
							.then(res => {
								//重新请求数据
								this.getData();
								uni.showToast({
									title: '删除成功',
									icon: 'none'
								});
								//结束loading
								uni.hideLoading();
							});
						close();
					});
					break;
				case '重命名':
					// 重命名只能对单个文件进行，所以取this.checkList[0],也就是选中的唯一元素
					this.renameValue = this.checkList[0].name;
					this.$refs.rename.open(close => {
						if (this.renameValue == '') {
							return uni.showToast({
								title: '文件名不能为空',
								icon: 'none'
							});
						}
						console.log(this.checkList[0].id + '>>>>>' + this.file_id);
						//重命名接口需要三个参数，自身id，目录id，新名称
						this.$H
							.post(
								'/file/rename',
								{
									id: this.checkList[0].id,
									file_id: this.file_id,
									name: this.renameValue
								},
								{ token: true }
							)
							.then(res => {
								this.checkList[0].name = this.renameValue;
								uni.showToast({
									title: '重命名成功',
									icon: 'none'
								});
							});
						close();
					});
				default:
					break;
			}
		},
		//打开添加操作条
		openAddDialog() {
			this.$refs.add.open();
		},
		//处理添加操作条的各种事件
		handleAddEvent(item) {
			this.$refs.add.close();
			switch (item.name) {
				case '新建文件夹':
					this.$refs.newdir.open(close => {
						if (this.newdirname == '') {
							return uni.showToast({
								title: '文件夹名称不能为空',
								icon: 'none'
							});
						}
						// 请求新增文件夹接口
						this.$H
							.post(
								'/file/createdir',
								{
									file_id: this.file_id,
									name: this.newdirname
								},
								{ token: true }
							)
							.then(res => {
								this.getData();
								uni.showToast({
									title: '新建文件夹成功',
									icon: 'none'
								});
							});
						close();
						this.newdirname = '';
					});
					break;
				case '上传图片':
					//选择图片，限制为9张
					uni.chooseImage({
						count: 9,
						success: res => {
							// 选择图片成功，就循环异步调用上传接口
							res.tempFiles.forEach(item => {
								this.upload(item, 'image');
							});
						}
					});
					break;
				default:
					break;
			}
		},
		// 返回上一个人目录
		backUp() {
			this.dirs.pop();
			this.getData();
			uni.setStorage({
				key: 'dirs',
				data: JSON.stringify(this.dirs)
			});
		},
		//搜索功能，关键字为空就走请求所有数据的接口，否则就将文本框实时输入的内容作为挂见此进行搜索
		search(e) {
			if (e.detail.value === '') {
				return this.getData();
			}
			this.$H
				.get('/file/search?keyword=' + e.detail.value, {
					token: true
				})
				.then(res => {
					this.list = this.formatList(res.rows);
				});
		},
		//生成唯一ID
		genID(length) {
			return Number(
				Math.random()
					.toString()
					.substr(3, length) + Date.now()
			).toString(36);
		},
		//上传
		upload(file, type) {
			// 上传文件类型
			let t = type;
			// 上传的key，用来区分每个文件
			const key = this.genID(8);
			// 构建上传文件的对象，文件名、类型、大小、唯一的key、进度、状态、创建时间
			let obj = {
				name: file.name,
				type: t,
				size: file.size,
				key,
				progress: 0,
				status: true,
				created_time: new Date().getTime()
			};
			// 创建上传任务，分发给Vuex的Actions，异步上传调度，主要是实现上传进度的回调
			this.$store.dispatch('createUploadJob', obj);
			// 上传，查询参数为当前位置所在目录的id，body参数为文件路径
			this.$H
				.upload(
					'/upload?file_id=' + this.file_id,
					{
						filePath: file.path
					},
					p => {
						//更新上传任务进度
						this.$store.dispatch('updateUploadJob', {
							status: true,
							progress: p,
							key
						});
					}
				)
				.then(res => {
					//上传成功，请求数据更新列表
					this.getData();
				});
		}
	},
	computed: {
		file_id() {
			let l = this.dirs.length;
			if (l === 0) {
				return 0;
			}
			return this.dirs[l - 1].id;
		},
		current() {
			let l = this.dirs.length;
			if (l === 0) {
				return false;
			}
			return this.dirs[l - 1];
		},
		//选中列表
		checkList() {
			return this.list.filter(item => item.checked);
		},
		//选中数量
		checkCount() {
			return this.checkList.length;
		},
		actions() {
			// console.log(this.checkCount);
			if (this.checkCount > 1) {
				return [
					{
						icon: 'icon-xiazai',
						name: '下载'
					},
					{
						icon: 'icon-shanchu',
						name: '删除'
					}
				];
			}
			return [
				{
					icon: 'icon-xiazai',
					name: '下载'
				},
				{
					icon: 'icon-fenxiang-1',
					name: '分享'
				},
				{
					icon: 'icon-shanchu',
					name: '删除'
				},
				{
					icon: 'icon-chongmingming',
					name: '重命名'
				}
			];
		}
	}
};
</script>

<style scoped></style>