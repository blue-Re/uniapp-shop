<template>
	<view
		@click="goToPath" 
		class="my-search-container" 
		:style="{ 'background-color' : bgColor}"
	>
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Search",
		data() {
			return {
				
			};
		},
		props: {
			bgColor: {
				type: String,
				default: '#C00000'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		methods: {
			goToPath() {
				this.$emit('myClick')
			} 
		}
	}
</script>

<style lang="scss">
.my-search-container{
	background-color: #C00000;
	height: 50px;
	padding: 0 10px;
	display: flex;
	align-items: center;
	.my-search-box{
		height: 36px;
		background-color: #FFFFFF;
		border-radius: 18px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}

</style>