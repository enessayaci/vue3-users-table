<script setup lang="ts">
import { ref, provide } from 'vue';

// Register fonksiyonu için tip tanımlaması
export type RegisterFunction = (input: { validate: () => boolean; }) => void;

const emit = defineEmits(['onSubmit'])

const inputs = ref<{ validate: () => boolean }[]>([]); // Tüm inputları burada tutacağız

// Register fonksiyonu
const register: RegisterFunction = (input) => {
  inputs.value.push(input);
};

// Validate fonksiyonu
const validate = () => {

  let isValid = true;
  
  inputs.value.forEach(input => {
    const result = input.validate();
    if (result !== true) {
      isValid = false;
    }
  });

  return isValid; 
};

// Submit işlemi
const handleSubmit = () => {
  if (validate()) {
    console.log("Form gönderiliyor!");
    emit('onSubmit', true)
  } else {
    console.log("Formda hata var, gönderilmiyor!");
    emit('onSubmit', false)
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
