<script setup lang="ts">
import { ref, provide } from 'vue';

// Register fonksiyonu için tip tanımlaması
export type RegisterFunction = (input: { validate: () => boolean; }) => void;

const inputs = ref<{ validate: () => boolean }[]>([]); // Tüm inputları burada tutacağız

// Register fonksiyonu
const register: RegisterFunction = (input) => {
  inputs.value.push(input);
};

// Validate fonksiyonu
const validate = () => {
  return inputs.value.every(input => input.validate());
};

// Submit işlemi
const handleSubmit = () => {
  if (validate()) {
    console.log("Form gönderiliyor!");
  } else {
    console.log("Formda hata var, gönderilmiyor!");
  }
};

// Provide register fonksiyonunu
provide('register', register);
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>
