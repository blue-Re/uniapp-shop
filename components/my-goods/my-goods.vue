<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClick"/>
			<image :src="goods.goods_small_logo || defaultImage" class="goods-pic" mode=""></image>
		</view>
		<view class="goods-item-right" >
			<view class="gooos-name">
				{{goods.goods_name}}
			</view>
			<view class="goods-info-box">
				<view class="goods-price">
					￥{{goods.goods_price | toFixed}}
				</view>
				<uni-number-box v-if="showNumber" :min="1" :value="goods.goods_count" @change="numberChange"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNumber: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		},
		data() {
			return {
				defaultImage: 'https://img2.baidu.com/it/u=1814268193,3619863984&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1663261200&t=05e6189d4c2ee54b04964e0fd568ec50'
			};
		},
		methods: {
			radioClick() {
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			numberChange(value) {
				this.$emit('number-change', {
					goods_id: this.goods.goods_id,
					goods_count: +value
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 5px;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.goods-price {
					font-size: 16px;
					color: #C00000;
				}
			}
		}
	}
</style>
