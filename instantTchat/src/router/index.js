import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ChannelFormView from '../views/ChannelFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/add-canal',
      name: 'add-canal',
      component: ChannelFormView,
    }
  ]
});

router.beforeEach((to, from) => {
  const token = localStorage.getItem("token")
  if (
    // make sure the user is authenticated
    !token &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})


export default router
