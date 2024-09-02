<script>
import { ref } from "vue";
// import AddItem_step1 from "./AddItem_step1.vue";
import AddItem_scan from "./AddItem_scan.vue";
export default {
    components: {
        // AddItem_step1,
        AddItem_scan
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
    <div class="container-fluid mb-3">
        <h1>Add item to your house's inventory</h1>
    </div>
    <hr>
    <AddItem_scan />
</template>

<style></style>
