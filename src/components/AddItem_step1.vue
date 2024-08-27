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
        emitNextStep() {
            this.$emit('nextStep');
        },
        emitChoseMode(mode) {
            this.$emit('choseMode', mode);
        }
}}
</script>

<template>
    <h3>Choose method</h3>
    <button @click="emitNextStep(); emitChoseMode('manual')">Manually type</button>
    <br />
    <button @click="emitNextStep(); emitChoseMode('barcode')">Barcode scanner</button>
</template>

<style></style>
