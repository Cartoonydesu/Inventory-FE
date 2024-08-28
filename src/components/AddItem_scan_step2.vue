<!-- <script src="https://unpkg.com/@zxing/library@latest"></script> -->
<script>
import { BrowserMultiFormatReader } from '@zxing/library';
import { ref } from 'vue';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import $ from 'jquery';
import 'bootstrap-datepicker';

export default {
    methods: {
        emitNextStep() {
            this.$emit('nextStep')
        }
    },
    setup() {
        const codeReader = new BrowserMultiFormatReader()
        const ean = ref()
        const item = ref()
        const scanStatus = ref(false)
        const createItem = ref({
            ean: "",
            title: "",
            brand: "",
            amount: 1,
            note: "",
            expiredDate: ""
        })
        const startScanning = () => {
            codeReader.decodeOnceFromVideoDevice(undefined, 'video')
                .then(async result => {
                    console.log(result)
                    ean.value = result
                    const response = await fetch(`http://localhost:8080/api/v1/upc-barcode-reader?ean=${ean.value}`)
                    const resultRes = await response.json();
                    item.value = resultRes.data
                    scanStatus.value = true
                    createItem.value.ean = item.value.ean
                    createItem.value.title = item.value.title
                    createItem.value.brand = item.value.brand
                })
                .catch(err => {
                    console.error(err)
                })
        }
        const increaseAmount = () => {
            createItem.value.amount++
        }
        const decreaseAmount = () => {
            createItem.value.amount--
        }
        return {
            ean, item, createItem, scanStatus,
            startScanning, increaseAmount, decreaseAmount
        }
    },
    // mounted() {
    //     $('#datepicker').datepicker({
    //         format: 'yyyy-mm-dd', // Date format
    //         autoclose: false,      // Automatically close after selecting a date
    //         // todayHighlight: true, // Highlight today
    //     }).on('changeDate', (event) => {
    //         createItem.value.expiredDate = event.format('yyyy-mm-dd')
    //     });
    // },
    // watch: {
    //     expiredDate (newDate) {
    //         $('#datepicker').datepicker('update', newDate);
    //     }
    // }
    mounted() {
        const vm = this
        $('#datepicker').datepicker({
            format: 'yyyy-mm-dd', // Date format
            autoclose: false,      // Automatically close after selecting a date
        }).on('changeDate', function (event) {
            vm.createItem.expiredDate = $(this).datepicker('getFormattedDate');
        });

    }
}
</script>

<template>
    <div class="container-fluid">
        <!-- <h3>Step 2 : Please scan the barcode</h3> -->
        <div class="row mb-4">
            <div class="col-6">
                <div class="mb-3">
                    <video id="video"/>
                </div>
                <!-- <br> -->
                <div style="text-align: center;">
                    <button id="start-button" @click="startScanning" class="btn btn-secondary">Start scanning</button>
                </div>
            </div>
            <div class="col-6">
                <label>EAN id </label>
                <input type="text" class="form-control mb-3" placeholder="Enter EAN id..." v-model="createItem.ean"
                    :disabled="scanStatus" />
                <label>Product name </label>
                <input type="text" class="form-control mb-3" placeholder="Enter product name..."
                    v-model="createItem.title" :disabled="scanStatus" />
                <label>Product brand </label>
                <input type="text" class="form-control mb-3" placeholder="Enter product brand..."
                    v-model="createItem.brand" :disabled="scanStatus" />
                <label>Amount </label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <button class="btn btn-light" type="button" @click="decreaseAmount"
                            :disabled="createItem.amount <= 1">&lt;</button>
                    </div>
                    <input type="number" class="form-control input-lg" placeholer="Enter amount..."
                        v-model="createItem.amount" style="text-align: center;" />
                    <div class="input-group-prepend">
                        <button class="btn btn-light" type="button" @click="increaseAmount">&gt;</button>
                    </div>
                </div>
                <label>Note </label>
                <textarea type="text" class="form-control mb-3" placeholder="Enter note..." v-model="createItem.note" />
                <label>Expired date </label>
                <div class="form-group input-group">
                    <div class="inpur-group-prepend">
                        <span class="input-group-text">
                            <i class="bi bi-calendar"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control" id="datepicker" v-model="createItem.expiredDate"
                        placeholder="Choose expired date..." />
                </div>
                <div style="text-align: right;">
                    <button class="btn btn-success">Add item</button>
                </div>
            </div>
        </div>
        <!-- <div class="row">
            <div class="col-6" style="text-align: center;">
                <button id="start-button" @click="startScanning" class="btn btn-secondary">Start scanning</button>
            </div>
            <div class="col-6" style="text-align: right;">
                <button class="btn btn-success">Add item</button>
            </div>
        </div> -->

    </div>
</template>

<style>
video {
    border: 1px solid lightgray;
    border-radius: 8px;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* input {
    white-space: nowrap; 
    overflow-x: auto;
} */


.datepicker {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    background-color: #f8f9fa;
    /* Background color of the popup */
    border: 1px solid #ced4da;
    /* Border color */
    border-radius: 0.25rem;
    /* Rounded corners */
    box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.2);
    /* Shadow effect */
}

/* Custom styling for the navigation header of the popup */
.datepicker-header {
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    background-color: #007bff;
    /* Header background color */
    color: white;
    /* Header text color */
}

/* Custom styling for the days in the popup */
.datepicker-days .day {
    color: #495057;
    /* Day text color */
}

/* Custom styling for the selected date */
.datepicker-days .day.active,
.datepicker-days .day.active:hover {
    background-color: #007bff;
    /* Background color of the selected date */
    color: white;
    /* Text color of the selected date */
}

/* Custom styling for the months and years picker */
.datepicker-months .month,
.datepicker-years .year {
    color: #495057;
    /* Text color */
}

/* Custom styling for the month/year header */
.datepicker-months .datepicker-switch,
.datepicker-years .datepicker-switch {
    background-color: #007bff;
    /* Header background color */
    color: white;
    /* Header text color */
}
</style>