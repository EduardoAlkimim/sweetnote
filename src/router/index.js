import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/SignIn.vue'
import Register from '../views/SignUp.vue'
import Forgot from '../views/ForgotPassword.vue'
import Dashboard from '../views/Dashboard.vue'
import Teachers from '../views/Teachers.vue'
import Student from '../views/Student.vue'
import Config from '../views/Config.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { hideTopNav: true } },
  { path: '/forgot', name: 'Forgot', component: Forgot, meta: { hideTopNav: true } },
  { path: '/register', name: 'Register', component: Register, meta: { hideTopNav: true }},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { hideTopNav: true, requiresAuth: true }},
  { path: '/teachers', name: 'Teachers', component: Teachers, meta: { hideTopNav: true, requiresAuth: true }},
  { path: '/student', name: 'Student', component: Student, meta: { hideTopNav: true, requiresAuth: true }},
  { path: '/config', name: 'Config', component: Config, meta: { hideTopNav: true, requiresAuth: true }},
  { path: '/:pathMatch(.*)*', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
