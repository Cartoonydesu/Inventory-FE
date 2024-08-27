<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    const listAll = ref([]);
    onMounted(async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/items");
        const result = await response.json();
        listAll.value = result;
      } catch (error) {
        console.error("Cannot fetch data");
      }
    });
    return {
      listAll,
    };
  },
};
</script>

<template>
  <h1>Get all item in your house</h1>
  <!-- <button>Add item</button> -->
  <hr />
  <!-- <p>{{ listAll }}</p> -->
  <!-- <v-table :data="listAll"> -->
  <table>
    <thead>
      <tr>
        <th>EAN</th>
        <th>Title</th>
        <th>Brand</th>
        <th>Amount</th>
        <th>Note</th>
        <th>ExpiredDate</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in listAll" :key="index">
        <!-- <td>{{row}}</td> -->
        <td>{{ row.ean }}</td>
        <td>{{ row.title }}</td>
        <td>{{ row.brand }}</td>
        <td>{{ row.amount }}</td>
        <td>{{ row.note }}</td>
        <td>{{ row.expiredDate }}</td>
      </tr>
    </tbody>
  </table>
  <!-- </v-table> -->
</template>

<style>

</style>
