<script>
import { onMounted, ref } from 'vue';
// import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js'

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
  }
};
</script>


<template>
  
  <!-- <link rel=”stylesheet” href=”https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css”/> -->
  <!-- <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p> -->
  <!-- <div class="container mt-5">
    <h2>Contact Us</h2>
    <form>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Enter your name">
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="name@example.com">
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">Message</label>
        <textarea class="form-control" id="message" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div> -->
  <nav>
    <div class="main-nav">
      <span class="container mr-4">
        <RouterLink to="/"><button class="btn btn-primary">Get all item</button></RouterLink>
      </span>
      <span class="container">
        <RouterLink to="/add-item"><button class="btn btn-primary">Add item</button></RouterLink>
      </span>
    </div>
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
  /* text-align: center; */
  color: #2c3e50;
  margin: 60px 40px;

}

/* .btn-primary {
  margin: 4px 8px 4px 0;
} */

.main-nav {
  text-align: right;
}
</style>
