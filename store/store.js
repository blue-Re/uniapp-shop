import Vue from 'vue'
import Vuex from 'vuex'

import Cart from './cart'
import User from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		Cart,
		User
	},
})

export default store;