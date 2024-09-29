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

const defaultClasses = props.variant != 'naked' ? 'font-medium text-xs rounded transition-all px-2.5 py-2' : null

// Buton stillerini tanımlama
const variantClasses = (() => {
  switch (props.variant) {
    case 'outline':
      return 'text-primary ring-offset-0 ring-inset ring-1 ring-primary hover:bg-primary-100 bg-transparent'; // Outline stili
    case 'naked':
      return null; // Naked stili
    default:
      return 'bg-primary text-white'; // Varsayılan stil
  }
})();

const colorClasses = (() => {
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
  }

  return result;
})();

</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <component v-ripple :is="to ? 'router-link' : 'button'" v-bind="attrs" :to="to" :class="cn(defaultClasses, variantClasses, colorClasses, props.class)">
    <slot />
  </component>
</template>
