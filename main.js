
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store'

// 导入网络请求
import { $http } from '@escook/request-miniprogram'
uni.$http = $http;

$http.baseUrl = 'https://api-hmugo-web.itheima.net'

$http.beforeRequest = function(option) {
	uni.showLoading({
		title: '数据加载中...'
	})
	if (option.url.indexOf('/my/') !== -1) {
		option.header = { 
			Authorization: store.state.User.token
		}
	} 
}

$http.afterRequest = function() {
	uni.hideLoading()
}

uni.$showMsg = function(title="数据请求失败！", duration=1500) {
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif