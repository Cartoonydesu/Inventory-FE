<script>
import { defineProps } from 'vue';
export default {
    setup() {
        const props = defineProps({
            showModal: Boolean,
            modalHeader: String,
            modalBody: String,
            modalFooter: String
        })
        return {
            props
        }
    }
}
</script>

<template>
    <transition name="fade">
        <div class="modal fade" :class="{ show: props.showModal }" tabindex="-1" role="dialog" style="display: block;"
            v-if="props.showModal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5>
                            {{ props.modalHeader }}
                        </h5>
                    </div>
                    <div class="modal-body">{{ props.modalBody }}</div>
                    <div class="modal-footer">{{ props.modalFooter }}</div>
                </div>
            </div>
        </div>
    </transition>
    <transition name="fade">
        <div class="modal-backdrop fade" :class="{ show: props.showModal }" v-if="props.showModal"></div>
    </transition>
</template>

<style>
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
</style>