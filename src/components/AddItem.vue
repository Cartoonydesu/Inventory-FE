<script>
import { ref } from "vue";
// import AddItem_step1 from "./AddItem_step1.vue";
import AddItem_scan_step2 from "./AddItem_scan_step2.vue";
export default {
    components: {
        // AddItem_step1,
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
    <div class="container-fluid">
        <h1>Add item to your house's inventory</h1>
    </div>
    <AddItem_scan_step2 />
</template>

<style></style>
