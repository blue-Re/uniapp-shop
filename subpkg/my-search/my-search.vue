<template>
	<view>
		<view class="search-box">
			<uni-search-bar 
				placeholder="请输入搜索内容" 
				@confirm="search" 
				@input="input"
				:radius="100"
				cancelButton="none"
				></uni-search-bar>
		</view>
		
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" 
				v-for="item in searchResults" 
				:key="item.goods_id"
				@click="goToDetail(item.goods_id)"
			>
				<view class="goods-name">
					{{ item.goods_name }}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clear"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag 
				 v-for="(item, index) in historyList"
				 :key="item"
				 :text="item"
					@click="goToGoodsList(item)"
				></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				keyWord: '',
				searchResults: [],
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('historyList') || '[]')
		},
		methods: {
			input(value) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.keyWord = value
					this.getSearchList()
				}, 500)
			},
			async getSearchList() {
				if (this.keyWord.length === 0) {
					this.searchResults = []
					return
				}
				const { data: { meta, message } = {} } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.keyWord })
				if (meta.status !== 200) return uni.$showMsg()
				this.searchResults = message;
				
				if (this.historyList.includes(this.keyWord)) return
				this.historyList.unshift(this.keyWord)
				uni.setStorageSync('historyList', JSON.stringify(this.historyList))
			},
			goToDetail(id) {
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?goods_id=${id}`
				})
			},
			clear() {
				this.historyList = []
				uni.setStorageSync('historyList', '[]')
			},
			goToGoodsList(goodsName) {
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?query=${goodsName}`
				})
			}
		}
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
}

.sugg-list{
	padding: 0 5px;
	.sugg-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		padding: 12px 0;
		border-bottom: 1px solid #efefef;
		.goods-name{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}

.history-box{
	padding: 0 5px;
	.history-title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		.uni-tag{
			margin-top: 5px;
			margin-right: 5px;
		}
	}
}
</style>
