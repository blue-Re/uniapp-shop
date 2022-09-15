import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('Cart', ['totalCartCount'])
	},
	watch: {
		totalCartCount() {
			this.setBadge()
		}
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index:2,
				text: this.totalCartCount+''
			})
		}
	}
}