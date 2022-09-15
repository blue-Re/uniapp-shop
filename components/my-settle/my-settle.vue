<template>
	<view class="my-settle-container">
		<label class="radio" @click="changeAllState">
			<radio color="red" :checked="isFullCheck"/><text>全选</text>
		</label>
		
		<view class="amount-box">
			合计: <text class="amount">￥{{allGoodsPrice}}</text>
		</view>
		
		<view class="btn-settle">
			结算({{checkCount}})
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters('Cart', ['checkCount', 'totalCartCount', 'allGoodsPrice']),
			isFullCheck() {
				return this.totalCartCount === this.checkCount
			}
		},
		methods: {
			...mapMutations('Cart', ['updateAllGoodsState']),
			changeAllState() {
				this.updateAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container{
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	font-size: 14px;
	padding-left: 5px;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	// background-color: cyan;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color: red;
			font-weight: bold;
		}
	}
	.btn-settle{
		background-color: red;
		color: white;
		height: 50px;
		line-height: 50px;
		padding: 0 10px;
		min-width: 100px;
		text-align: center;
	}
}
</style>