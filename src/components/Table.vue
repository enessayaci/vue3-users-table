<script setup lang="ts">
import { defineProps } from 'vue';

// Generic tip tanımı
const props = defineProps<{
  heads: { label: string; key: string }[];
  data: Array<Record<string, any>>; // Herhangi bir veri yapısını temsil eden generic tip
}>();
</script>

<template>
  <table class="w-full">
    <thead>
      <tr>
        <th v-for="(head, index) in heads" :key="index">
          {{ head.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, rowIndex) in data" :key="rowIndex">
        <td v-for="(head, colIndex) in heads" :key="colIndex">
          <slot :name="head.key" :item="item">{{ item[head.key] }}</slot> <!-- Her başlık için ayrı slot -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th,
td {
  @apply px-4 py-3 text-start last:text-end text-xs font-medium;
}

th {
  @apply bg-neutral-100 first:rounded-tl-md last:rounded-tr-md text-neutral;
}

tr {
  @apply text-neutral-700 dark:text-neutral-400;
}
</style>
