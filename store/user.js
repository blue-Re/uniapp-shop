export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		// token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		redirectInfo: null
	}),
	mutations: {
		updateAddress(state, payload) {
			state.address = payload
			this.commit('User/saveAddressToStorage')
		},
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		updateUserInfo(state, payload) {
			state.userInfo = payload
			this.commit('User/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
		},
		updateToken(state, payload) {
			state.token = payload
			this.commit('User/saveTokenToStorage')
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		updateRedirectInfo(state, payload) {
			state.redirectInfo = payload
		}
	},
	getters: {
		addStr(state) {
			if (!state.address.provinceName) return ''
			
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	},
}  