<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu class="tab-menu" :categories="categories"/>
      <div>
<!--
        <tab-content-category :subcategories="showSubcategory"/>
-->
      </div>
    </div>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";

  import {getCategory,getSubcategory} from "network/category";

  export default {
    name: "Category",
    components: {
      NavBar,
      TabMenu,
      TabContentCategory
    },
    data() {
      return {
        categories: []
      }
    },
    computed:{
      showSubcategory(){
        return
      }
    },
    created() {
      //请求分类数据
      this._getCategory()
      //请求分类数据子数据
      this._getSubcategories(0)
    },
    mounted() {
    },
    methods: {
      _getCategory(){
        getCategory().then(res => {
          this.categories = res.data.category.list
        })

      },
      _getSubcategories() {
        getSubcategory(3627).then(res => {
          console.log(res)
        })
      },
    }

  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
  }
  .tab-menu{
    width: 80px;
  }
</style>
