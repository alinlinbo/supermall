<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      name: "Scroll",
      props: {
        probeType: {
          type: Number,
          default:0
        },
        pullUpLoad: {
          type: Boolean,
          default: false
        }
      },
      data() {
        return {
          scroll: null
        }
      },
      mounted() {
        //创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
          click:true,
          pullUpLoad : this.pullUpLoad,
          probeType: this.probeType,
        })
        //监听滚动的位置
        this.scroll.on('scroll',(position) => {
          this.$emit('scroll',position)
        })
        if (this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            // console.log('上拉加载更多');
            this.$emit('pullingUp')
          })
        }
      }

    }
</script>

<style scoped>

</style>
