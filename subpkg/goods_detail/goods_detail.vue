<template>
	<view v-if="goodsInfo.goods_name" class="goods-detail-container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goodsInfo.pics" :key="item.goods_id">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		
		<view class="goods-info-box">
			<view class="price">￥{{ goodsInfo.goods_price }}</view>
			<view class="goods-info-body">
				<view class="goods-name">
					{{ goodsInfo.goods_name}}
				</view>
				
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			
			<view class="yf">快递·免运费</view>
		</view>
		
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		
		<view class="goods_nav">
			<uni-goods-nav 
				:fill="true" 
				:options="options" 
				:buttonGroup="buttonGrounp"
				@click="onClick"
				@buttonClick="buttonClick"
			></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				goodsInfo: {},
				options:[
					{
						icon: 'headphones',
						text: '客服'
					},
					{
						icon: 'shop',
						text: '店铺',
						infoBackgroundColor: '#007aff',
						infoColor: 'red'
					},
					{
						icon: 'cart',
						text: '购物车',
						info: 0
					}
				],
				buttonGrounp: [
					{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		computed: {
			...mapState('Cart', ['cart']),
			...mapGetters('Cart', ['totalCartCount'])
		},
		watch: {
			totalCartCount: {
				immediate: true,
				handler(newValue) {
					const findResult = this.options.find(item => item.text === '购物车')
					if (findResult) {
						findResult.info = newValue
					} 
				}
			}
		},
		onLoad(options) {
			const { goods_id } = options
			this.getGoodsDetail(goods_id)
		},
		methods: {
			...mapMutations('Cart', ['addToCart']),
			async getGoodsDetail(goods_id) {
				const { data: { meta, message } = {} } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
				if (meta.status !== 200) return uni.$showMsg()
				message.goods_introduce = message.goods_introduce.replace(/<img /g, '<img style="display: block;"').replace(/webp/g, 'jpg')
				this.goodsInfo = message;
			},
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.goodsInfo.pics.map(x => x.pics_big)
				})
			},
			onClick(event) {
				const { content: { text } = {}} = event
				if (text === '购物车') {
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(event) {
				const { content: { text } = {}} = event;
				if (text === '加入购物车') {
					const { goods_id, goods_name, goods_price, goods_small_logo } = this.goodsInfo
					const goods = {
						goods_id,
						goods_name,
						goods_price,
						goods_count: 1,
						goods_small_logo,
						goods_state: true
					}
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail-container{
		padding-bottom: 50px;
	}
swiper{
	height: 750rpx;
	image{
		height: 100%;
		width: 100%;
	}
}

.goods-info-box{
	padding: 10px;
	padding-right: 0;
	.price{
		color: #c00000;
		font-size: 18px;
		margin: 10px 0;
	}
	.goods-info-body{
		display: flex;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
			margin-right: 10px;
		}
		.favi{
			width: 120px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-left: 1px solid #efefef;
			color: gray;
		}
	}
	.yf{
		font-size: 12px;
		color: gray;
		margin: 10px 0;
	}
}
.goods_nav{
	position: fixed;
	bottom: 0%;
	left: 0%;
	width: 100%;
}
</style>
