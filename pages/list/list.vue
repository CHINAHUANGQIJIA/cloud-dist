<template>
  <view style="height: 100vh;" class="flex flex-column">
    <view class="flex border-bottom border-light-secondary" style="height: 100rpx;">
      <view
        class="flex-1 flex flex-column align-center justify-center"
        v-for="(item, index) in tabBars"
        :key="index"
        :class="index === tabIndex ? 'text-main' : ''"
        @click="changeTab(index)"
      >
        <text class="font-md">{{ item.name }}</text>
        <text
          style="height: 7rpx; width: 360rpx;"
          class="rounded"
          :class="tabIndex === index ? 'bg-main' : 'bg-white'"
        ></text>
      </view>
    </view>

    <!-- swiper内容随着上面tab的切换联动 -->
    <swiper :duration="250" class="flex-1 flex" :current="tabIndex" @change="changeTab($event.detail.current)">
      <swiper-item class="flex-1 flex" v-for="(item, index) in tabBars" :key="index">
        <scroll-view scroll-y="true" class="flex-1">
          <view style="height: 60rpx;" class="bg-light flex align-center font-sm px-2 text-muted">
            文件下载至：storage/uni-app/download/
          </view>
		  <template v-if="index === 1">
		  <view class="p-2 border-bottom border-light-secondary font text-muted">
		  				  上传中· {{uploading.length}}
		  			  </view>
		  			  <f-list v-for="(item, index) in uploading" :key="'i' + index" :item="item" :index="index">
		  				  <view class="flex align-center text-main" style="height: 70rpx;">
		  					  <text class="iconfont icon-zanting"></text>
		  					  <text class="ml-1">{{item.progress}}</text>
		  				  </view>
		  				  <progress slot="bottom" :percent="item.progress" activeColor="#009CFF" :stroke-width="4"></progress>
		  			  </f-list>
		  			  
		  			  
		  			  <view class="p-2 border-bottom border-light-secondary font text-muted">
		  			    上传完成· {{ uploaded.length }}
		  			  </view>
		  			  <f-list
		  			    v-for="(item, index) in uploaded"
		  			    :key="'d' + index"
		  			    :item="item"
		  			    :index="index"
		  			    :showRight="false"
		  			  ></f-list>
		  </template>
		  <template v-else>
			  <view class="p-2 border-bottom border-light-secondary font text-muted">
				  下载中· {{downloading.length}}
			  </view>
			  <f-list v-for="(item, index) in downloading" :key="'i' + index" :item="item" :index="index">
				  <view class="flex align-center text-main" style="height: 70rpx;">
					  <text class="iconfont icon-zanting"></text>
					  <text class="ml-1">{{item.progress}}</text>
				  </view>
				  <progress slot="bottom" :percent="item.progress" activeColor="#009CFF" :stroke-width="4"></progress>
			  </f-list>
			  
			  
			  <view class="p-2 border-bottom border-light-secondary font text-muted">
			    下载完成· {{ downloaded.length }}
			  </view>
			  <f-list
			    v-for="(item, index) in downloaded"
			    :key="'d' + index"
			    :item="item"
			    :index="index"
			    :showRight="false"
			  ></f-list>
		  </template>

        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import fList from '@/components/common/f-list.vue';
import { mapState } from 'vuex';
export default {
  components: {
    fList
  },
  data() {
    return {
      tabIndex: 0,
      tabBars: [
        {
          name: '下载列表'
        },
        {
          name: '上传列表'
        }
      ],
    };
  },
  computed: {
	  ...mapState({
		  uploadList: state => state.uploadList,
		  downlist: state => state.downlist
	  }),
	  uploading(){
		  return this.uploadList.filter(item =>{
			  return item.progress < 100;
		  });
	  },
	  uploaded(){
		  return this.uploadList.filter(item =>{
			  return item.progress === 100;
		  });
	  },
	  downloading(){
	  		  return this.downlist.filter(item =>{
	  			  return item.progress < 100;
	  		  });
	  },
	  downloaded(){
	  		  return this.downlist.filter(item =>{
	  			  return item.progress === 100;
	  		  });
	  }
  },
  methods: {
    changeTab(index) {
      this.tabIndex = index;
    }
  },
  onNavigationBarButtonTap() {
  	uni.showModal({
  		content:'是否要清除传输记录？',
  		success: res =>{
  			if(res.confirm){
  				this.$store.dispatch('clearList');
  				uni.showToast({
  					title:"清除成功",
  					icon:'none'
  				});
  			}
  		}
  	})
  }
};
</script>

<style lang="scss"></style>