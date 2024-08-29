<!-- <script src="https://unpkg.com/@zxing/library@latest"></script> -->
<script>
import { BrowserMultiFormatReader } from '@zxing/library';
import { ref } from 'vue';
import $ from 'jquery';
import 'bootstrap-datepicker';

window.$ = window.jQuery = $;

export default {
    methods: {
        emitNextStep() {
            this.$emit('nextStep')
        },
        // showModal() {
        //     $(this.$refs.myModal).modal('show');
        // },
        // hideMclose() {
        //     $(this.$refs.myModal).modal('hide');
        // }
    },
    setup() {
        const codeReader = new BrowserMultiFormatReader()
        const ean = ref()
        const item = ref()
        const scanStatus = ref(false)
        const showModal = ref(false)
        const createItem = ref({
            ean: null,
            title: null,
            brand: null,
            amount: 1,
            note: null,
            expiredDate: null
        })
        // onMounted(() => {
        //     showModal.value = true;
        // });

        const startScanning = () => {
            codeReader.decodeOnceFromVideoDevice(undefined, 'video')
                .then(async result => {
                    ean.value = result
                    const response = await fetch(`http://localhost:8080/api/v1/upc-barcode-reader?ean=${ean.value}`)
                    const resultRes = await response.json()
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
        const fetchCreateItem = async () => {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(createItem.value)
            }
            const response = await fetch(`http://localhost:8080/api/v1/items`, requestOptions)
            const resultRes = await response.json()
            console.log(resultRes)
            showModal.value = true;
        }
        const increaseAmount = () => {
            createItem.value.amount++
        }
        const decreaseAmount = () => {
            createItem.value.amount--
        }
        // const openModal = () => {
        //     showModal.value = true;
        // }
        const closeModal = () => {
            showModal.value = false;
            createItem.value = {
                ean: null,
                title: null,
                brand: null,
                amount: 1,
                note: null,
                expiredDate: null
            }
            scanStatus.value = false
            startScanning()
        };
        return {
            ean, item, createItem, scanStatus, showModal,
            startScanning, increaseAmount, decreaseAmount, fetchCreateItem, closeModal
        }
    },
    mounted() {
        const vm = this
        $('#datepicker').datepicker({
            format: 'yyyy-mm-dd', // Date format
            autoclose: false,      // Automatically close after selecting a date
        }).on('changeDate', function () {
            vm.createItem.expiredDate = $(this).datepicker('getFormattedDate');
        });

    }
}
</script>

<template>
    <div>
        <transition name="fade">
            <div class="modal fade" :class="{ show: showModal }" tabindex="-1" role="dialog" style="display: block;"
                v-if="showModal">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add item successful</h5>
                        </div>
                        <div class="modal-body">
                            <p><b>{{ createItem.title }}</b> was added</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" @click="closeModal">Add more item</button>
                            <a href="/">
                                <button type="button" class="btn btn-secondary" href="/">Close</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="modal-backdrop fade" :class="{ show: showModal }" v-if="showModal"></div>
        </transition>
    </div>


    <div class="container-fluid">
        <!-- <h3>Step 2 : Please scan the barcode</h3> -->
        <div class="row mb-4">
            <div class="col-6">
                <div class="mb-3">
                    <video id="video" style="width:100%" />
                </div>
                <!-- <br> -->
                <div style="text-align: center;">
                    <button id="start-button" @click="startScanning" class="btn btn-secondary">Start
                        scanning</button>
                </div>
                <div>{{ ean }}</div>
                <div>{{ createItem }}</div>
            </div>
            <div class="col-6">
                <label>EAN id </label>
                <input type="text" class="form-control mb-3" placeholder="Enter EAN id..." v-model="createItem.ean"
                    :disabled="scanStatus" />
                <label>Product name </label>
                <label class="required">*</label>
                <input type="text" class="form-control mb-3" placeholder="Enter product name..."
                v-model="createItem.title" :disabled="scanStatus" />
                <label>Product brand </label>
                <input type="text" class="form-control mb-3" placeholder="Enter product brand..."
                v-model="createItem.brand" :disabled="scanStatus" />
                <label>Amount </label>
                <label class="required">*</label>
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
                <div class="form-group input-group mb-4">
                    <div class="inpur-group-prepend">
                        <span class="input-group-text">
                            <i class="bi bi-calendar"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control" id="datepicker" v-model="createItem.expiredDate"
                        placeholder="Choose expired date..." />
                </div>
                <div style="text-align: right;">
                    <button class="btn btn-success" @click="fetchCreateItem" :disabled="createItem.amount == 0 || createItem.title == null">Add item</button>
                </div>
            </div>
        </div>
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}

.required{
    color: red;
}
</style>