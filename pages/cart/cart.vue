<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		
		<uni-swipe-action>
			<block v-for="(item,index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swipeItemHandle(item)">
					<my-goods :goods="item" :showRadio="true" :showNumber="true" @radio-change="radioChange"
						@number-change="numberChange">
					</my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<my-settle></my-settle>
	</view>
	
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也</text>
	</view>
</template>

<script>
	import badgeMxin from '@/mixins/tabbar-badge.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#c00000'
						}
					}
				]
			};
		},
		mixins: [badgeMxin],
		computed: {
			...mapState('Cart', ['cart'])
		},
		methods: {
			...mapMutations('Cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioChange(event) {
				// console.log(event);
				this.updateGoodsState(event)
			},
			numberChange(event) {
				// console.log(event);
				this.updateGoodsCount(event)
			},
			swipeItemHandle(goods) {
				this.removeGoodsById(goods)
			}
		}
	}
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 50px;
	}
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}
	
	.empty-cart{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		.empty-img{
			width: 90px;
			height: 90px;
		}
		.tip-text{
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>
