<template>
  <nav class="flex items-center" aria-label="Breadcrumb">
    <ol class="flex space-x-2">
      <li class="flex items-center">
        <Button to="/" variant="naked" tabindex="-1"
          class="flex items-center dark:text-slate-300 hover:text-blue-400 hover:bg-transparent">
          <IconHome />
        </Button>
        <span class="ml-2 text-xs font-medium text-slate-300">/</span>
      </li>
      <li v-for="(item, index) in breadcrumbs" :key="index" class="flex items-center">
        <template v-if="index < breadcrumbs.length - 1">
          <template v-if="isRouteDefined(item.link)">
            <router-link :to="item.link" class="text-sm hover:text-blue-400 hover:bg-transparent text-gray-500">
              {{ item.text }}
            </router-link>
          </template>
          <template v-else>
            <span class="font-medium text-sm text-gray-500">{{ item.text }}</span>
          </template>
        </template>
        <template v-else>
          <span class="font-medium text-sm">{{ item.text }}</span>
        </template>
        <span v-if="index < breadcrumbs.length - 1" class="ml-2 text-xs font-medium text-slate-300">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconHome from '../components/icons/IconHome.vue'; // İkon bileşenini içe aktar
import Button from '../components/ui/Button.vue'

interface BreadcrumbItem {
  text: string;
  link: string;
}

const route = useRoute();
const router = useRouter();

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const pathArray = route.path.split('/').filter((path) => path);
  return pathArray.map((path, index) => ({
    text: path.charAt(0).toUpperCase() + path.slice(1), // İlk harfi büyük yap
    link: '/' + pathArray.slice(0, index + 1).join('/'),
  }));
});

// Route tanımlı mı kontrol etme
const isRouteDefined = (link: string): boolean => {
  return router.getRoutes().some(route => route.path === link);
};
</script>

<style scoped>
/* Tailwind CSS still defined in the template, no need for additional styles here */
</style>
