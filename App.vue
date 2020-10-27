<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		// 初始化用户信息
		this.$store.dispatch('initUser');
		// 初始化任务列表
		this.$store.dispatch('initList');
	},
	onShow: function() {
		console.log('App Show');
		if (this.$store.state.user) {
			//去查看有无分享链接，这样可以进入页面就可以检测到水是有粘贴过链接
			this.$store.dispatch('getShareUrl');
		}
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*引入官方样式库*/
@import url('./common/uni.css');
/*引入图标样式库*/
@import url('./common/icon.css');
/*引用通用free样式库*/
@import url('./common/free.css');
/*引入本项目公共样式库*/
@import url('./common/common.css');
</style>
