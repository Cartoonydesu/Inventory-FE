<script>

    // const emit = defineEmits(['nextStep']);
// export default {
//     setup() {
        // const props = defineProps({
        //     step: {
        //         type: Number,
        //         required: true,
        //     },
        // });
//     },
// };
export default{
    methods: {
        // emitNextStep() {
        //     this.$emit('nextStep');
        // },
        emitChoseMode(mode) {
            this.$emit('choseMode', mode);
        }
}}
</script>

<template>
    <h3>Step 1 : Please choose method</h3>
    <button @click="emitChoseMode('manual')" class="btn btn-primary">Manually type</button>
    <br/>
    <button @click="emitChoseMode('barcode')" class="btn btn-primary">Barcode scanner</button>
</template>

<style></style>
