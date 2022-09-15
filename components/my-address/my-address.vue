<template>
	<view>
		<view class="address-choose-box" v-if="addressIsNull">
			<button type="primary" size="mini" class="btn-choose-btn" @click="addressOption">请选择收货地址</button>
		</view>

		<view class="address-info-box" v-else @click="addressOption">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					{{addStr}}
				</view>
			</view>
		</view>

		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {
				// address: {}
			};
		},
		computed: {
			...mapState('User', ['address']),
			addressIsNull() {
				return JSON.stringify(this.address) === '{}'
			},
			addStr() {
				const { provinceName, cityName, countyName, detailInfo } = this.address
				if (!provinceName) return ''
				
				return `${provinceName}${cityName}${countyName}${detailInfo}`
			}
		},
		methods: {
			...mapMutations('User', ['updateAddress']),
			async reAuth() {
				// 重新授权
				const [err, confirmResult] = await uni.showModal({
					content: '检测到您没有打开地址权限，是否去打开？',
					confirmText: '确认',
					cancelText: '取消'
				})
				if (err) return
				
				const { cancel, confirm } = confirmResult
				if (cancel) return uni.$showMsg('您取消了授权')
				if (confirm) return uni.openSetting({
					success(result) {
						const { authSetting } = result
						if (authSetting['scope.address']) return uni.$showMsg('授权成功，请选择地址')
						if (!authSetting['scope.address']) return uni.$showMsg('取消授权')
					}
				})
			},
			async addressOption() {
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
					this.updateAddress(succ)
				}
				if (err && (err.Msg === 'chooseAddress:fail auth deny' || err.Msg === 'chooseAddress:fail authorize no response')) {
					this.reAuth();
				}
			}
		}
	}
</script>

<style lang="scss">
	.address-border {
		display: flex;
		width: 100%;
		height: 5px;
	}

	.address-choose-box {
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-left {
				.username {}
			}

			.row1-right {
				display: flex;
				justify-content: space-between;

				.phone {}
			}
		}

		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}

			.row2-right {}
		}
	}
</style>
