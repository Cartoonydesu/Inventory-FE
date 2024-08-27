import { defineStore,acceptHMRUpdate } from 'pinia';
import { ref } from 'vue'


export const getItems = defineStore('listAllItemd', () => {
    const listItems = ref([])
    const getItems = async () => {
        const res = await fetch('http://localhost:8080/api/v1/items')
        listItems.value = await res.json()
    }
    return {listItems, getItems} 
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(getItems, import.meta.hot))
}