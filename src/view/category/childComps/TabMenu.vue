<template>
  <div class="menu-list">
    <div class="menu-list-item"
         v-for="(item,index) in categories"
         :class="{active: index===currentIndex}" @click="itemClick(index)">{{item.title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabMenu",
    props: {
      categories: Array,
      default() {
        return []
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    background-color: #eeeeee;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
