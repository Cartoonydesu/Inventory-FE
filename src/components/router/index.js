import { createRouter } from 'vue-router'
import AllItem from '../AllItem.vue'
import AddItem from '../AddItem.vue'
import { createWebHistory } from 'vue-router/dist/vue-router'

const routes = [
    {
        path: '/',
        name: 'ListAllItem',
        component: AllItem
    },
    {
        path: '/add-item',
        name: 'AddItem',
        component: AddItem
    }
]

const router = createRouter({
    history: createWebHistory(), 
    routes,
})

export default router