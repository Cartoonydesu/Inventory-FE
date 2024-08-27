import { createRouter } from 'vue-router'
import AllItem from '../AllItem.vue'
import { createMemoryHistory } from 'vue-router'
import AddItem from '../AddItem.vue'

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
    history: createMemoryHistory(), 
    routes,
})

export default router