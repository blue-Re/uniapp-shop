<template>
	<view>
		<view class="login-container">
			<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
			
			<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
			
			<view class="tips-text">
				登录后尽享更多权益
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('User', ['redirectInfo'])
		},
		methods: {
			...mapMutations('User', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			getUserInfo(event) {
				if (event.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				const userInfo = {
					avatarUrl: event.detail.userInfo.avatarUrl,
					city: '晋中市',
					country: '中国',
					gender: '男',
					language: '汉语',
					nickName: event.detail.userInfo.nickName,
					province: '山西省'
				}
				this.updateUserInfo(userInfo)
				this.getToken(event.detail)
			},
			async getToken(info) {
				const { encryptedData, iv, rawData, signature } = info
				const [err, res] = await uni.login({ provider: 'weixin'}).catch(err => err)
				if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败~~') 
				
				const query = {
					code: res.code,
					encryptedData,
					iv,
					rawData,
					signature
				}
				const { data, data: { meta } = {} } = await uni.$http.post(`/api/public/v1/users/wxlogin`, query)
				// 接口token失效，模拟一个
				const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
				this.updateToken(token)
				this.navigateBack()
			},
			navigateBack() {
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						complete() {
							
						}
					})
					this.updateRedirectInfo(null)
				}
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	height: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;
	position: relative;
	overflow: hidden;
	&::after{
		content: ' ';
		display: block;
		width: 100%;
		height: 40px;
		background-color: white;
		position: absolute;
		bottom: 0%;
		left: 0%;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.btn-login{
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #c00000;
	}
	.tips-text{
		font-size: 12px;
		color: gray;
	}
}
</style>