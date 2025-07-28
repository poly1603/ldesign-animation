import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import BasicAnimations from '../views/BasicAnimations.vue'
import CSSAnimations from '../views/CSSAnimations.vue'
import JSAnimations from '../views/JSAnimations.vue'
import Transitions from '../views/Transitions.vue'
import Sequences from '../views/Sequences.vue'
import ScrollAnimations from '../views/ScrollAnimations.vue'
import Interactive from '../views/Interactions.vue'
import Components from '../views/Components.vue'
import Performance from '../views/Performance.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/basic',
    name: 'BasicAnimations',
    component: BasicAnimations
  },
  {
    path: '/css',
    name: 'CSSAnimations',
    component: CSSAnimations
  },
  {
    path: '/js',
    name: 'JSAnimations',
    component: JSAnimations
  },
  {
    path: '/transitions',
    name: 'Transitions',
    component: Transitions
  },
  {
    path: '/sequences',
    name: 'Sequences',
    component: Sequences
  },
  {
    path: '/scroll',
    name: 'ScrollAnimations',
    component: ScrollAnimations
  },
  {
    path: '/interactive',
    name: 'Interactive',
    component: Interactive
  },
  {
    path: '/components',
    name: 'Components',
    component: Components
  },
  {
    path: '/performance',
    name: 'Performance',
    component: Performance
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router