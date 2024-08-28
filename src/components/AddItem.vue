<script>
import { ref } from "vue";
import AddItem_step1 from "./AddItem_step1.vue";
import AddItem_scan_step2 from "./AddItem_scan_step2.vue";
export default {
    components: {
        AddItem_step1,
        AddItem_scan_step2
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
    <!-- <h3>{{ step }}</h3> -->
    <h3>{{ mode }}</h3>
    <div v-if="mode == ''">
        <!-- <h3>Choose method</h3>
        <button @click="nextStep">Manually type</button>
        <br>
        <button @click="nextStep">Barcode scanner</button> -->
        <AddItem_step1 
            @choseMode="choseMode"/>
    </div>
    <div v-if="mode == 'barcode'">
        <AddItem_scan_step2/>
    </div>
</template>

<style></style>
