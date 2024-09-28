<script setup lang="ts">
import { defineProps, useAttrs, computed } from 'vue';
import { cn } from '../../lib/utils';

// Prop tiplerini tanımlama
const props = defineProps<{
  to?: string | null; // Router link için opsiyonel to prop'u
  variant?: 'default' | 'outline' | 'naked'; // Varyant için belirli değerler,
  color?: any;
  class?: string;
}>();

// Dışarıdan gelen tüm attribute'ları almak için useAttrs kullanıyoruz
const attrs = useAttrs();

// Buton stillerini tanımlama
const variantClasses = computed(() => {
  switch (props.variant) {
    case 'outline':
      return 'text-primary ring-offset-0 ring-inset ring-1 ring-primary hover:bg-primary-100 bg-transparent font-medium text-xs rounded transition-all px-2.5 py-2'; // Outline stili
    case 'naked':
      return null
    default:
      return 'bg-primary text-white font-medium text-xs rounded transition-all px-2.5 py-2'
  }
});

const colorClasses = computed(() => {
  // Renk yoksa, boş bir string döndür
  if (!props.color || props.variant == "naked") return '';

  const colorParts = props.color.split('-');
  const colorBase = colorParts[0]; // Renk temelini al
  const colorShade = colorParts[1] ? parseInt(colorParts[1]) : undefined; // Renk tonunu al

  let result;

  if (!props.variant) {

    const hoverShade = colorShade !== undefined ? colorShade + 100 : 600; // Renk tonu yoksa varsayılan hover tonu
    const hoverBgColor = hoverShade <= 900 ? hoverShade : 900; // 900'den fazla olmamalı
    result = `bg-${props.color} hover:bg-${colorBase}-${hoverBgColor}`;

  } else if (props.variant == "outline") {

    result = `ring-${props.color} hover:bg-${colorBase}-100`;
    console.log(result);
    
  }

  return result;
});

const combinedClasses = computed(() => {
  return cn(variantClasses.value, colorClasses.value, props.class)
})

</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <component v-ripple :is="to ? 'router-link' : 'button'" v-bind="attrs" :to="to" :class="combinedClasses">
    <slot />
  </component>
</template>
