

export default {
  addCounter(state, payload) {
    payload.count += 1;
  },
  addCart(state, payload){
    state.cartList.push(payload)
    payload.checked = true
  },

}
