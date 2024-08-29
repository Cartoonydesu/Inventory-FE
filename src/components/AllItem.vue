<script>
import moment from "moment";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const fetchAllItems = async () => {
      try {
        const response = await fetch(`${process.env.VUE_APP_URL}/api/v1/items`);
        const result = await response.json();
        listAll.value = result;
      } catch (error) {
        console.error("Cannot fetch data");
      }
    }
    const listAll = ref([]);
    onMounted(() => {
      fetchAllItems()
    });
    const fetchDeleteItem = async (id) => {
      const requestOptions = {
        method: "DELETE",
      }
      const response = await fetch(`${process.env.VUE_APP_URL}/api/v1/items/${id}`, requestOptions)
      // await fetch(`http://localhost:8080/api/v1/items/${id}`, requestOptions)
      console.log(response.statusText)
      console.log(response.body)
      fetchAllItems()
    }
    const formatExpiredDate = (text) => {
      if (text != null) {
        return moment(String(text)).format('D MMM YYYY')
      }
    }
    return {
      listAll,
      formatExpiredDate, fetchDeleteItem
    };
  },
};
</script>

<template>
  <h1>Get all item in your house</h1>
  <!-- <button>Add item</button> -->
  <hr />
  <!-- <p>{{ listAll.data }}</p> -->
  <!-- <v-table :data="listAll"> -->
  <table class="table table-striped">
    <thead class="thead-dark">
      <tr>
        <!-- <th>EAN</th> -->
        <th></th>
        <th>Title</th>
        <th>Brand</th>
        <th>Amount</th>
        <th>Note</th>
        <th>ExpiredDate</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in listAll.data" :key="index">
        <!-- <td>{{row}}</td> -->
        <!-- <td>{{ row.ean }}</td> -->
        <td>
          <button class="btn btn-outline-danger" @click="fetchDeleteItem(row.itemId)"><i
              class="bi bi-trash"></i></button>
        </td>
        <td>{{ row.title }}</td>
        <td>{{ row.brand }}</td>
        <td>{{ row.amount }}</td>
        <td>{{ row.note }}</td>
        <td>{{ formatExpiredDate(row.expiredDate) }}</td>
        <!-- <td>{{  moment(String(row.ex)) }}</td> -->
      </tr>
    </tbody>
  </table>
  <!-- </v-table> -->
</template>

<style></style>
