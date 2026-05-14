import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css' // shadcn 和 tailwind 的基础样式
import App from './App.vue'

// 简单的路由配置 (后续补充组件)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('./views/LoginView.vue') },
    { path: '/dashboard', component: () => import('./views/DashboardView.vue') }
  ]
})

// 全局路由守卫：没 Token 踢回登录页
router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  
  // 如果去往非登录/注册页，且没有 token，则重定向到 /login
  if (to.path !== '/login' && to.path !== '/register' && !token) {
    return '/login' // 直接 return 路径，替代原先的 next('/login')
  }
  
  // 放行当前导航
  return true // 替代原先的 next()
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
