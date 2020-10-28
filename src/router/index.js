import Vue from 'vue'
import VueRouter from 'vue-router'

import Cart from "../view/cart/Cart";
import Category from "../view/category/Category";
import Home from "../view/home/Home";
import Profile from "../view/profile/Profile";
import Ddetail from "../view/detail/Detail";

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:id',
    component: Ddetail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router
