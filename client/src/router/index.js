import { createRouter, createWebHashHistory } from 'vue-router'
import MainEditor from '../views/MainEditor.vue'

const routes = [
  {
    path: '/',
    name: 'MainEditor',
    component: MainEditor
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
