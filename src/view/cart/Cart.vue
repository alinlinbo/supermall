<template>
  <div class="cart">
    <!--导航-->
    <NavBar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>
    <!--列表-->
    <cart-list/>
    <!--底部汇总-->
    <cart-button-bar />
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartButtonBar from "./childComps/CartButtonBar";
  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartButtonBar,
    },
    computed:{
      cartLength(){
        return this.$store.state.cartList.length
      },
      ...mapGetters({

      })
    }
  }
</script>

<style scoped>
  .nav-bar{
    color: white;
    background-color: var(--color-high-text);
  }
  .cart{
    height: 100vh;
  }
</style>
