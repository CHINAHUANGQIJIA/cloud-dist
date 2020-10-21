<template>
  <view>
    <!-- 自定义导航栏 -->
    <nav-bar>
      <text slot="left" class="font-md ml-3 text-white" >首页</text>
      <template slot="right">
        <view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-icon rounded-circle mr-3">
          <text class="iconfont icon-zengjia"></text>
        </view>
        <view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-icon rounded-circle mr-3">
          <text class="iconfont icon-gengduo"></text>
        </view>
      </template>
	  
    </nav-bar>
	<view class="seach">
		<uni-search-bar></uni-search-bar>
	</view>
   
  </view>
  
  
  
  
  
</template>

<script>
  import uniSearchBar from '@/components/uni-ui/uni-search-bar/uni-search-bar.vue';
  import navBar from '@/components/common/nav-bar.vue';
  export default {
    components: {
      navBar,
	  uniSearchBar
    },
    data() {
      return {

      }
    },
    onLoad() {

    },
    methods: {

    }
  }
</script>

<style>
	.seach{
		margin-top: 15rpx;
	}
</style>