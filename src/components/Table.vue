<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import Button from './ui/Button.vue';
import IconAsc from './icons/IconAsc.vue';
import IconDesc from './icons/IconDesc.vue';
import IconWarn from './icons/IconWarn.vue';
import DataNotFound from './DataNotFound.vue';

// Generic tip tanımı
const props = defineProps<{
  heads: { label: string; key: string; sort?: boolean; }[];
  data: Array<Record<string, any>>; // Herhangi bir veri yapısını temsil eden generic tip
  initialSortField?: string,
  initialSortOrder?: 'asc' | 'desc' 
}>();

const sortField = ref<string>(props.initialSortField ?? '')
const order = ref<'asc' | 'desc'>(props.initialSortOrder ?? 'asc')

const sortedData = computed(() => {
  return sort(props.data, sortField.value, order.value)
})

function sort(data: any[], field: string, order: 'asc' | 'desc' = 'asc') {
  return [...data].sort((a, b) => {
    const aField = a[field] !== undefined ? a[field] : "";
    const bField = b[field] !== undefined ? b[field] : "";

    if (order === 'asc') {
      return aField > bField ? 1 : -1;
    } else {
      return aField < bField ? 1 : -1;
    }
  });
}

function handleHeadClick(field: string) {
  sortField.value = field
  order.value = order.value == 'desc' ? 'asc' : 'desc'
}

</script>

<template>
  <table class="w-full">
    <thead>
      <tr>
        <th v-for="(head, index) in heads" :key="index">
          <Button tabindex="-1" v-if="head.sort" variant="naked" class="flex" @click="handleHeadClick(head.key)">
            {{ head.label }}
            <span v-show="sortField == head.key" class="ms-1 w-4">
              <IconAsc v-show="order == 'asc'" />
              <IconDesc v-show="order == 'desc'" />
            </span>
          </Button>
          <span v-else>{{ head.label }}</span>

        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, rowIndex) in sortedData" :key="rowIndex">
        <td v-for="(head, colIndex) in heads" :key="colIndex">
          <slot :name="head.key" :item="item">{{ item[head.key] }}</slot> <!-- Her başlık için ayrı slot -->
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="data.length <= 0">
    <DataNotFound/>
  </div>
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
