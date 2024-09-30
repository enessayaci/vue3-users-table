<script lang="ts" setup>
import { useLoading } from '../composables/useLoading';
import IconSpinner from './icons/IconSpinner.vue';

const { isLoading } = useLoading(); // Composable'ı doğrudan kullan
</script>

<template>
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div class="animate-spin w-16 h-16 text-white ">
      <IconSpinner/>
    </div>
  </div>
</template>
