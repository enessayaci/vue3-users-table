<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, useAttrs, inject, onMounted, type PropType } from 'vue';
import Tooltip from '../Tooltip.vue';
import type { RegisterFunction } from '../FormProvider.vue';

// Prop tiplerini tanımlama
const props = defineProps<{
  modelValue?: string | number
  type?: 'text' | 'number' | 'email'; // type optional hale getirildi
  label?: string
  tooltip?: string
  class?: string
  inputClasses?: string
  labelClasses?: string
  min?: number
  max?: number
  required?: boolean,
}>();

const emit = defineEmits(["update:modelValue"]);

const attrs = useAttrs();

const type = props.type ?? 'text'
const min = props.min ?? 0; // Min değer
const max = props.max ?? 0; // Max değer
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // E-posta regex
const required = props.required;

const value = computed({
  get: () => props.modelValue ? props.modelValue : '',
  set: (val) => emit("update:modelValue", val)
});

// Hata kontrolü ve mesajları
const error = computed(() => {
  const result = {
    required: required ? (value.value.toString().length > 0 ? true : `Bu alan zorunludur`) : true,
    min: (type == 'text' && min) ? (value.value.toString().length >= min ? true : `En az ${min} karakter giriniz`) : true,
    max: (type == 'text' && max) ? (value.value.toString().length <= max ? true : `En fazla ${max} karakter giriniz`) : true,
    minNumber: (type == 'number' && min) ? (value.value as number >= min ? true : `En küçük ${min} olabilir`) : true,
    maxNumber: (type == 'number' && max) ? (value.value as number <= min ? true : `En büyük ${min} olabilir`) : true,
    email: (type == 'email' && required) ? emailRegex.test(value.value as string) ? true : 'Geçerli bir e-posta adresi giriniz' : true
  };
  
  return Object.values(result).find(item => item !== true) ?? false;
});

// Validation fonksiyonu
const validate = () => {
  return error.value === false; // Eğer hata yoksa true dön
};
// FormProvider'dan register fonksiyonunu al
const register = inject<RegisterFunction>('register');

// Register fonksiyonunu kullanarak inputu kaydet
onMounted(() => {
  if (register) {
    register({ validate }); // register varsa kaydet
  } else {
    console.error("Register fonksiyonu bulunamadı."); // Hata mesajı
  }
});

const inputClasses = "px-2.5 py-1.5 leading-5 border-0 focus-visible:outline-0 ring-1 ring-neutral-300 dark:ring-neutral-600 focus:ring-black dark:focus:ring-neutral-300 rounded placeholder-neutral-300 bg-transparent";
const combinedInputClasses = computed(() => {
  return cn(inputClasses, props.inputClasses, { 'ring-red-500 focus:ring-red-500': error.value });
});

const wrapperClasses = "grid gap-y-1";
const combinedWrapperClasses = cn(wrapperClasses, props.class);
</script>

<template>
  <div :class="combinedWrapperClasses">
    <div class="flex gap-x-1.5">
      <label v-if="props.label">{{ props.label }}</label>
      <Tooltip v-if="props.tooltip" :text="props.tooltip" />
    </div>
    <input :type="type == 'number' ? 'number' : 'text' " v-model="value" v-bind="attrs" :class="combinedInputClasses" />
    <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
