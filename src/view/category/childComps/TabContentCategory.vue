<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <div v-for="(item,index) in subcategories.list">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>

</template>

<script>
  import GridView from "components/common/gridView/GridView";
  export default {
    name: "TabContentCategory",
    props: {
      subcategories: {
        type: Object,
        default() {
          return []
        }
      }
    },
    components:{
      GridView,
    }
  }
</script>

<style scoped>

</style>
