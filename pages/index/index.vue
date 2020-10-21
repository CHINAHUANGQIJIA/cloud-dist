<template>
  <view>
    <!-- 自定义导航栏 -->
    <nav-bar>
      <text slot="left" class="font-md ml-3">首页</text>
      <template slot="right">
        <view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-icon rounded-circle mr-3">
          <text class="iconfont icon-zengjia"></text>
        </view>
        <view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-icon rounded-circle mr-3">
          <text class="iconfont icon-gengduo"></text>
        </view>
      </template>
    </nav-bar>
    
    <view class="bg-info" style="height: 1500px;"><text>123</text></view>
  </view>
</template>

<script>
  import navBar from '@/components/common/nav-bar.vue'
  export default {
    components: {
      navBar
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
</style>