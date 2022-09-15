export default {
	namespaced: true,
	state: () => ({
		cart: JSON.parse(uni.getStorageSync('Cart') || '[]')
	}),
	mutations: {
		addToCart(state, payload) {
			const findResult = state.cart.find(item => item.goods_id === payload.goods_id)
			if (!findResult) {
				state.cart.push(payload)
			}else {
				findResult.goods_count++
			}
			this.commit('Cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('Cart', JSON.stringify(state.cart))
		},
		updateGoodsState(state, payload) {
			const findResult = state.cart.find(item => item.goods_id === payload.goods_id)
			
			if (findResult) {
				findResult.goods_state = payload.goods_state
				this.commit('Cart/saveToStorage')
			}
		},
		updateGoodsCount(state, payload) {
			const findResult = state.cart.find(item => item.goods_id === payload.goods_id)
			
			if (findResult) {
				findResult.goods_count = payload.goods_count
				this.commit('Cart/saveToStorage')
			}
		},
		removeGoodsById(state, payload) {
			state.cart = state.cart.filter(item => item.goods_id !== payload.goods_id)
			console.log(state.cart);
			this.commit('Cart/saveToStorage')
		},
		updateAllGoodsState(state, payload) {
			state.cart.forEach(item => item.goods_state = payload)
			this.commit('Cart/saveToStorage')
		},
	},
	getters: {
		totalCartCount(state) {
			// let count = 0
			// state.cart.forEach(item => count+= item.goods_count)
			// return count
			return state.cart.reduce((total, item) => total+= item.goods_count, 0)
		},
		checkCount(state) {
			return state.cart.filter(item => item.goods_state).reduce((total, item) => total+= item.goods_count, 0)
		},
		allGoodsPrice(state) {
			return state.cart.filter(item => item.goods_state).reduce((total, item) => total+=item.goods_count * item.goods_price, 0).toFixed(2)
		}
	},
}  