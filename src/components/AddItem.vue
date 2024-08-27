<script>
import { ref } from "vue";
import AddItem_step1 from "./AddItem_step1.vue";
export default {
    components: {
        AddItem_step1,
    },
    setup() {
        const step = ref(1);
        const mode = ref("")
        const nextStep = () => {
            step.value++
        }
        const choseMode = (chosenMode) => {
            mode.value = chosenMode
        }
        return {
            step, mode, 
            nextStep, choseMode
        }
    },
};
</script>

<template>
    <h1>Add item to your house's inventory</h1>
    <h3>{{ step }}</h3>
    <h3>{{ step }}, {{ mode }}</h3>
    <div v-if="step === 1">
        <!-- <h3>Choose method</h3>
        <button @click="nextStep">Manually type</button>
        <br>
        <button @click="nextStep">Barcode scanner</button> -->
        <AddItem_step1 
            @nextStep="nextStep"
            @choseMode="choseMode"/>
    </div>
</template>

<style></style>
