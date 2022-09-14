<template>
	<view>
		<my-search @myClick="goToSearch"></my-search>
		<view class="scroll-view-container">
			<scroll-view scroll-y="true" :style="{height: windowHeight + 'px'}" class="left-scroll-view">
				<block v-for="(item, index) in categoryList" :key="item.cat_id">
					<view 
						:class="['left-scroll-view-item', index === active? 'active': '']"
						@click="activeChange(index)"
					>{{item.cat_name}}</view>
				</block>
			</scroll-view>
			
			<scroll-view scroll-y="true" :style="{height: windowHeight + 'px'}">
				<view
					class="cate-lv2"
					v-for="item in categorySecondList"
					:key="item.cat_id"
				>
					<view class="cate-lv2-title">
						{{item.cat_name}}
					</view>
					
					<view class="cate-lv3-list">
						<view
							class="cate-lv3-item"
							v-for="child in item.children"
							:key="child.cat_id"
							@click="goToPath(child.cat_id)"
							>
							<image :src="child.cat_icon" mode=""></image>
							<text>{{child.cat_name}}</text>
						</view>
					</view>
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: 0,
				categoryList: [],
				categorySecondList: [],
				active: 0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync();
			this.windowHeight = sysInfo.windowHeight - 50;
			this.getCategoryList();
		},
		methods: {
			async getCategoryList() {
				const { data: { meta, message } = {} } = await uni.$http.get('/api/public/v1/categories')
				if (meta.status !== 200) return uni.$showMsg()
				this.categoryList = message;
				this.categorySecondList = message[0].children;
			},
			activeChange(index) {
				this.active = index
				this.categorySecondList = this.categoryList[index].children
			},
			goToPath(id) {
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?cid=${id}`
				})
			},
			goToSearch() {
				uni.navigateTo({
					url:'/subpkg/my-search/my-search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width: 120px;
		.left-scroll-view-item {
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			&.active{
				background-color: white;
				position: relative;
				&::before{
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #C00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
}
.cate-lv2-title{
	font-size: 12px;
	font-weight: bold;
	text-align: center;
	padding: 15px 0;
}

.cate-lv3-list{
	display: flex;
	flex-wrap: wrap;
	.cate-lv3-item{
		width: 33.33%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
		image{
			width: 60px;
			height: 60px;
		}
		text{
			font-size: 12px;
		}
	}
}
</style>
