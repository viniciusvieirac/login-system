import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const Profile = () => import('../views/Profile.vue')

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, meta: { guest: true } },
  { path: '/register', component: Register, meta: { guest: true } },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) return next('/login')

  if (to.meta.guest && isAuthenticated) return next('/profile')

  next()
})

export default router
