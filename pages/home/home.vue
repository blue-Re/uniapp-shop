<template>
	<view>
		<view class="search-box">
			<my-search @myClick="goToSearch"></my-search>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<view class="nav-list">
			<view class="nav-item" @click="goToPath(item)" v-for="item in navList	" :key="item.name">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		
		<view class="floor-list">
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item" :url="child.url" v-if="Cindex !== 0" v-for="(child, Cindex) in item.product_list" :key="Cindex">
							<image :src="child.image_src" :style="{ width: child.image_width + 'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>	

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: [],
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const { data: { meta, message } = {} } = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (meta.status !== 200) return uni.$showMsg()
				this.swiperList = message;
				uni.$showMsg('请求数据成功')
			},
			async getNavList() {
				const { data: { meta, message } = {} } = await uni.$http.get('/api/public/v1/home/catitems')
				if (meta.status !== 200) return uni.$showMsg()
				this.navList = message;
			},
			async getFloorList(){
				const { data: { meta, message } = {} } = await uni.$http.get('/api/public/v1/home/floordata')
				if (meta.status !== 200) return uni.$showMsg()
				message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split("?")[1]
					})
				})
				this.floorList = message;
			},
			goToPath(itemObj) {
				if (itemObj.name === '分类') {
					uni.switchTab({
						url:"/pages/category/category"
					})
				}
			},
			goToSearch() {
				uni.navigateTo({
					url:"/subpkg/my-search/my-search"
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper{
		height: 330rpx;
		.swiper-item,image{
			width: 100%;
			height: 100%;
		}
	}
	
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin: 15px 0;
		
		.nav-img{
			width: 128rpx;
			height: 140rpx;
			
		}
	}
	
	.floor-title{
		height: 60rpx;
		width: 100%;
		display: flex;
	}
	
	.right-img-box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.floor-img-box{
		display: flex;
		padding-left: 10rpx;
	}
	.search-box{
		position: sticky;
		z-index: 999;
		top: 0;
	}
</style>
