<script>
import { onMounted, ref } from 'vue';

  export default {
    setup() {
    const listAll = ref([]);
    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/items');
        const result = await response.json()
        listAll.value = result
      } catch (error) {
        console.error("Cannot fetch data")
      }
    });
    return {
      listAll
    };
  }};
</script>

<template>
  <!-- <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p> -->
  <nav>
    <RouterLink to="/">Get all item</RouterLink>
    <br>
    <RouterLink to="/add-item">Add item</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
