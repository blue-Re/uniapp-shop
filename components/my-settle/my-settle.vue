<template>
	<view class="my-settle-container">
		<label class="radio" @click="changeAllState">
			<radio color="red" :checked="isFullCheck"/><text>全选</text>
		</label>
		
		<view class="amount-box">
			合计: <text class="amount">￥{{allGoodsPrice}}</text>
		</view>
		
		<view class="btn-settle" @click="settleClick">
			结算({{checkCount}})
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations, mapState } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				seconds: 3, // 倒计时秒数
				timer: null
			};
		},
		computed: {
			...mapGetters('Cart', ['checkCount', 'totalCartCount', 'allGoodsPrice']),
			...mapGetters('User', ['addStr']),
			...mapState('User', ['address', 'token']),
			...mapState('Cart', ['cart']),
			isFullCheck() {
				return this.totalCartCount === this.checkCount
			},
		},
		methods: {
			...mapMutations('Cart', ['updateAllGoodsState']),
			...mapMutations('User', ['updateRedirectInfo']),
			changeAllState() {
				this.updateAllGoodsState(!this.isFullCheck)
			},
			settleClick() {
				if (!this.checkCount) return uni.$showMsg('请选择要结算的商品')
				
				if (!this.addStr) return uni.$showMsg('请选择收获地址')
				
				// if (!this.token) return uni.$showMsg('请进行登录')
				if (!this.token) return this.delayNavigate()
				
				this.payOrder()
				
			},
			showTips(time) {
				uni.showToast({
					icon: 'none',
					title: `请登录后在结算！${time} s 后进行跳转`,
					mask: 'true',
					duration: 1500
				})
			},
			delayNavigate() {
				this.seconds = 3
				this.showTips(this.seconds)
				
				this.timer = setInterval(() => {
					this.seconds--
					
					if (this.seconds <= 0 ) {
						clearInterval(this.timer)
						uni.switchTab({
							url: '/pages/my/my',
							success() {
								
							}
						})
						this.updateRedirectInfo({
							openType: 'switchTab',
							from: '/pages/cart/cart' 
						})
						return
					}
					
					this.showTips(this.seconds)
				}, 1000)
			},
			async payOrder() {
				const orderInfo = {
					
					order_price: 0.01,
					consignee_addr: this.addStr,
					goods: this.cart.filter(item => item.goods_state).map(item => ({
						goods_id: item.goods_id,
						goods_number: item.goods_count,
						goods_price: item.goods_price
					}))
				}
				// 创建订单
				const {data: { meta, message } = {}} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				if (meta.status !== 200) return uni.$showMsg('创建订单失败！')
				const orderNumber = message.order_number;
				
				// 订单预支付
				const { data } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
				if (data.meta.status !== 200) return uni.$showError('预支付订单生成失败~') 
				console.log(data,'@@@@@@@@@@@@@@@@@@@@@@@@@@');
				const payInfo = {...data.message.pay, provider:'wxpay', appid: 'wx42b17ff3df3511ac' }
				console.log(payInfo, '!!!!!!!!!!!');
				// 微信支付
				const [err, succ] = await uni.requestPayment(payInfo)
				console.log(err, succ,333333333333333333333);
				if (err) return uni.$showMsg('订单未支付')
				// 完成支付 查询支付结果
				const { data:res } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
				// 检测到订单未支付
				if (res.meta.status !== 200) return uni.$showMsg('订单未支付~')
				// 检测到订单完成
				uni.showToast({
					title:'支付成功',
					icon:'success'
				})
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