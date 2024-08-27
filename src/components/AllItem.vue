<script setup>
import { onMounted, ref } from 'vue';
import { getItems } from './listAllItems';

    // async fetchListItems() {
    //     try {
    //         const response = await fetch('localhost:8080/api/v1/items')
    //     }
    // }
    const items = ref([])
    const store = getItems()
    onMounted(async () => {
        await store.getItems()
        items.value = store.listItems
    })
</script>

<template>
    <h1>List all items in your house</h1>
    <h3>This is :</h3>
</template>

<style>

</style>