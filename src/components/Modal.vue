<script setup lang="ts">
import IconClose from './icons/IconClose.vue';
import Button from '@/components/ui/Button.vue';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    class?: string;
    title?: string;
    description?: string;
    actionButtonText?: string;
    actionForm?: string;
    isActionButton?: boolean;
    closeOnAction?: boolean;
  }>(),
  {
    closeOnAction: false 
  }
);
const emit = defineEmits(['update:modelValue', 'onAction', 'onClose' ]);

function beforeEnter(el: Element) {
  (el as HTMLElement).style.opacity = '0';
}

function enter(el: Element, done: () => void) {
  (el as HTMLElement).offsetHeight; // trigger reflow
  (el as HTMLElement).style.transition = 'opacity 0.5s ease';
  (el as HTMLElement).style.opacity = '1';
  done();
}

function leave(el: Element, done: () => void) {
  (el as HTMLElement).style.transition = 'opacity 0.5s ease';
  (el as HTMLElement).style.opacity = '0';

  setTimeout(() => {
    done();
  }, 500); // CSS geçiş süresi ile eşit olmalı
}

function handleClose() {
  emit("update:modelValue", false)
  emit('onClose')
}

function handleAction() {
  emit('onAction')
  if (!props.actionForm || props.closeOnAction) {
    emit("update:modelValue", false)
    emit('onClose')
  }
}
</script>

<template>
  <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <div v-if="modelValue" id="componentModal"
      class="fixed flex justify-center items-center bottom-0 top-0 right-0 left-0 z-50 transition-opacity duration-500">
      
      <div @click="handleClose" class="modal-overlay bg-black bg-opacity-50 absolute top-0 left-0 right-0 bottom-0">
      </div>

      <div class="modal-dialog shadow bg-white dark:bg-neutral-900 absolute min-w-96 rounded-lg z-10">

        <slot name="header">
          <div class="flex px-5 py-4">
            <div class="flex">
              <span
                class="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center me-4"></span>
              <div class="flex flex-col justify-between">
                <h3 v-if="title" class="font-medium leading-4">{{ title }}</h3>
                <p v-if="description" class="font-medium leading-4 mb-0 text-neutral-400 font-sm">{{ description }}
                </p>
              </div>
            </div>
            <Button tabindex="-1" @click="handleClose" variant="naked" class="ms-auto mb-auto text-neutral-400 -translate-y-1">
              <IconClose />
            </Button>
          </div>
        </slot>

        <div class="px-5 py-4">
          <slot/>
        </div>

        <slot name="footer" v-if="$slots.footer || isActionButton">
          <div class="px-5 py-4 flex">
            <Button @click="handleAction" :form="actionForm ?? undefined" class="ms-auto">{{ actionButtonText ?? 'Ok' }}</Button>
          </div>
        </slot>

      </div>

    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
