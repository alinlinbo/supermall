<template>
  <div class="check-button" :class="{check: isCheck}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isCheck: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .check-button {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .check {
    border-color: red;
    background-color: red;
  }
</style>
