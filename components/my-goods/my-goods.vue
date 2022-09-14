<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<image :src="item.goods_small_logo || defaultImage" class="goods-pic" mode=""></image>
		</view>
		<view class="goods-item-right">
			<view class="gooos-name">
				{{item.goods_name}}
			</view>
			<view class="goods-info-box">
				<view class="goods-price">
					￥{{item.goods_price | toFixed}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			item: {
				type: Object,
				default: {}
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
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
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

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				.goods-price {
					font-size: 16px;
					color: #C00000;
				}
			}
		}
	}
</style>
