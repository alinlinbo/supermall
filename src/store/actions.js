
export default {
  addCart(context, payload) {
    //查找之前是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if (oldProduct) {
      context.commit('addCounter', oldProduct)
    } else {
      context.commit('addCart', payload)
      payload.count = 1
    }
  }
}
