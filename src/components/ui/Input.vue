<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, useAttrs, inject, onMounted, ref } from 'vue';
import Tooltip from '../Tooltip.vue';
import type { RegisterFunction } from '../FormProvider.vue';

// Prop tiplerini tanımlama
const props = defineProps<{
  modelValue?: string | number;
  type?: 'text' | 'number' | 'email';
  label?: string;
  tooltip?: string;
  class?: string;
  inputClasses?: string;
  labelClasses?: string;
  min?: number;
  max?: number;
  required?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const attrs = useAttrs();

const type = props.type ?? 'text';
const min = props.min ?? 0;
const max = props.max ?? 0;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const required = props.required;

// Kullanıcı etkileşimini takip etmek için değişken
const isTouched = ref(false);

const value = computed({
  get: () => props.modelValue ? props.modelValue : '',
  set: (val) => {
    emit("update:modelValue", val);
    isTouched.value = true; // Kullanıcı inputa etkileşimde bulundu
  }
});

// Hata kontrolü ve mesajları
const error = computed(() => {
  const result = {
    required: required ? (value.value.toString().length > 0 ? true : `This field is required`) : true,
    min: (type == 'text' && min) ? (value.value.toString().length >= min ? true : `Must be min ${min} character`) : true,
    max: (type == 'text' && max) ? (value.value.toString().length <= max ? true : `Must be max ${max} character`) : true,
    minNumber: (type == 'number' && min) ? (value.value as number >= min ? true : `Must ve min ${min}`) : true,
    maxNumber: (type == 'number' && max) ? (value.value as number <= max ? true : `Must be max ${max}`) : true,
    email: (type == 'email' && required) ? emailRegex.test(value.value as string) ? true : 'Enter a valid e-mail' : true
  };

  const errorState = Object.values(result).find(item => item !== true) ?? false

  return errorState
});

// Validation fonksiyonu
const validate = () => {
  isTouched.value = true
  return error.value === false; // Eğer hata yoksa true dön
};

// FormProvider'dan register fonksiyonunu al
const register = inject<RegisterFunction>('register');

// Register fonksiyonunu kullanarak inputu kaydet
onMounted(() => {
  if (register) {
    register({ validate });
  } else {
    console.error("Register fonksiyonu bulunamadı.");
  }
});

const inputClasses = "px-2.5 py-1.5 leading-5 border-0 focus-visible:outline-0 ring-1 ring-slate-300 dark:ring-slate-600 focus:ring-black dark:focus:ring-slate-300 rounded placeholder-slate-300 bg-transparent";
const combinedInputClasses = computed(() => {
  return cn(inputClasses, props.inputClasses, { 'ring-rose-500 focus:ring-rose-500': error.value && isTouched.value});
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
    <input :type="type == 'number' ? 'number' : 'text'" v-model="value" v-bind="attrs" :class="combinedInputClasses" />
    <span v-if="error && isTouched" class="text-xs text-rose-500">{{ error }}</span>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
