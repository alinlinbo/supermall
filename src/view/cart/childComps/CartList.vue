<template>
  <div class="cart-list">
    <Scroll ref="scroll" class="content">
      <cart-list-item
        v-for="(item,index) in cartList"
        :key="index"
        :itemInfo="item"/>

    </Scroll>
  </div>

</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      Scroll,
      CartListItem,
    },
    activated() {

    },
    created() {

    },
    mounted() {
      console.log(this.cartList)
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
