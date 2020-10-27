import Vue from 'vue'
import App from './App'

//引入封装的请求库并挂载在Vue原型上，使用的时候：this.$H
//Vue.prototype.appName = 'My App',这样各个Vue实例就可以通过￥appName的方式应用
//这样做不会污染全局变量
import $H from './common/request.js';
Vue.prototype.$H = $H

//引入Vuex并挂载在Vue原型上，使用的时候： this.store
import store from './store/index.js';
Vue.prototype.store = store

Vue.config.productionTip = false

Vue.prototype.authMethod = (callback) => {
	if (!store.state.token) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/login',
		});
	}

	callback()
}

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
