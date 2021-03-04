import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SplashHome from './components/SplashHome.vue'

const About = { template: '<div>ABOUT</div>' }

const routes = [
  { path: '/', component: SplashHome },
  { path: '/hello-world', component: HelloWorld },
  { path: '/about', component: About }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
