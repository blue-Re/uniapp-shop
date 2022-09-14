<template>
	<view>
		<view class="goods-list">
			<view 
				v-for="item in goodsList" 
				:key="item.goods_id"
				@click="goToDetail(item.goods_id)"
			>
				<my-goods :item="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				total: 0,
				goodsList: [],
				isLoading: false
				
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || '';
			this.queryObj.cid = options.cid|| '';
			this.getGoodsList();
		},
		methods: {
			async getGoodsList(cb) {
				this.isLoading = true
				const { data: { meta, message } = {} } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isLoading = false
				
				cb && cb()
				
				if (meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList, ...message.goods];
				this.total = message.total;
				
			},
			goToDetail(id) {
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?goods_id=${id}`
				})
			}
		},
		onReachBottom() {
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕...')
			if (this.isLoading) return
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = false
			this.goodsList = []
			
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
