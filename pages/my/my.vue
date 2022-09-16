<template>
	<view class="my-container">
		<my-login v-if="!token"></my-login>
		
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	import badgeMxin from '@/mixins/tabbar-badge.js';
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		mixins: [badgeMxin],
		computed: {
			...mapState('User', ['token'])
		}
	}
</script>

<style lang="scss">
.my-container{
	page, .my-container{
		height: 100%;
	}
}
</style>
