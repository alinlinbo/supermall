<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <TabControl ref="tabControl1"
                :title="['流行','新款','精选']"
                @tabClick="tabClick"
                class="tab-control"
                v-show="isTabFixed"
    ></TabControl>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load = "true" @pullingUp = "loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>

      <TabControl ref="tabControl2"
                  :title="['流行','新款','精选']"
                  @tabClick="tabClick"
      ></TabControl>
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from "./childComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from "components/content/tabControl/TabControl";
  import GoodList from "components/content/goods/GoodList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import { getHomeMultidata,getHomeGoods } from "network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: { page: 0, list: [] },
          new: { page: 0, list: [] },
          sell: { page: 0, list: [] }
        },
        currentType: 'pop',
        isShowBackTop:false,
        tabOffsetTop: 0,
        isTabFixed: false,
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
     this.getHomeMultidata()


      //2、请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      //监听主页图片加载
      this.$bus.$on('goodsItemImgLoad',() => {
        this.$refs.scroll.scroll.refresh()
      })
    },
    mounted() {

    },
    methods: {
      /**
       *
       * 监听
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
                break
          case 1:
            this.currentType = 'new'
                break
          case 2:
            this.currentType = 'sell'
                break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backTop(){
        this.$refs.scroll.scroll.scrollTo( 0, 0, 500 )
      },
      contentScroll(position){
        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //判断tabControl是否吸顶
        this.isTabFixed = (-position.y) >= this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      //获取tabControl的offsetTop
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },



      /**
       *
       * 网络请求相关方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.scroll.finishPullUp()
        })

      },

    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }
  .content {
    position: absolute;
    height: 500px;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
