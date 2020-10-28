<template>
  <div id="detail" >
    <detail-navbar class="detail-nav"
                   @titleClick="titleClick" ></detail-navbar>
    <scroll ref="scroll" :probe-type="3" @scroll="contentScroll" class="content">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop ="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <good-list ref="recommends" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavbar from "./childComps/DetailNavbar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodList from "components/content/goods/GoodList";

  import {getDetail,Goods,Shop,GoodsParam,getRecomment} from 'network/detail'
    export default {
        name: "Detail",
      components:{
        DetailNavbar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        Scroll,
        GoodList,
        DetailBottomBar
      },
      data(){
          return{
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
          }
      },
      created() {
          this.iid = this.$route.params.id
        //根据id请求详情数据
        getDetail(this.iid).then( res => {
          const data = res.result
          this.topImages = data.itemInfo.topImages
          // 获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          // 获取店铺信息
          this.shop = new Shop(data.shopInfo)
          // 获取商品详细信息
          this.detailInfo = data.detailInfo
          // 保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          //取出第一条评论信息
          if (data.rate.cRate != 0){
            this.commentInfo = data.rate.list[0]
          }
        })
        getRecomment().then(res => {
          this.recommends = res.data.list
        })

        //监听详情页推荐图片加载
        /*this.$bus.$om('detailItemImgLoad',() => {
          this.$refs.scroll.scroll.refresh()
        })*/


      },
      mounted() {

      },
      methods: {
        imageLoad() {
          this.$refs.scroll.scroll.refresh()
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
          console.log(this.themeTopYs)
        },
        titleClick(index){
          this.$refs.scroll.scroll.scrollTo(0,-(this.themeTopYs[index]),200)
        },
        contentScroll(promise){
          console.log(promise)

        },
        addToCart() {
          // 2.将商品信息添加到Store中
          const product = {}
          product.iid = this.iid
          product.imgURL = this.topImages[0]
          product.title = this.goods.title
          product.desc = this.goods.desc
          product.price = this.goods.realPrice
          console.log(product)
          //this.$store.commit('addCart',product)
          this.$store.dispatch('addCart',product)


        },
      }
    }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    height: 100vh;
    background-color: white;

  }
  .detail-nav {
    background-color: white;
    position: relative;
    z-index: 9;
  }
  .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
  }
</style>
