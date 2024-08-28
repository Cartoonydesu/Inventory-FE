<!-- <script src="https://unpkg.com/@zxing/library@latest"></script> -->
<script>
import { BrowserMultiFormatReader } from '@zxing/library';

    export default {
        methods: {
            emitNextStep() {
                this.$emit('nextStep')
            }
        },
        setup() {
            const codeReader = new BrowserMultiFormatReader()
            const startScanning = () => {
                codeReader.decodeFromVideoDevice(undefined, 'video')
                    .then(result => {
                        console.log(result)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
            return {
                startScanning
            }
        }
    }
</script>

<template>
    <h3>Step 2 : Please scan the barcode</h3>
    <video id="video" width="300px" height="200px" style="border: 1px solid black"/>
    <br>
    <button id="start-button" @click="startScanning">Start scanning</button>
</template>

<style></style>