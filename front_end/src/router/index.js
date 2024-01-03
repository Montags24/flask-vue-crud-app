import { createRouter, createWebHistory } from 'vue-router'
import Ping from '../components/Ping.vue'
import Books from '../components/Books.vue'
import Bootstrap from '../components/Bootstrap.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ping',
      name: 'ping',
      component: Ping
    },
    {
      path: '/books',
      name: 'books',
      component: Books
    },
    {
      path: '/bootstrap',
      name: 'bootstrap',
      component: Bootstrap
    }
  ]
})

export default router
