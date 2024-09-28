<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Breadcrumb from './components/Breadcrumb.vue'

</script>

<template>
  <div class="flex flex-col min-h-screen p-8">
    <header>
      <Breadcrumb />
    </header>

    <RouterView />
  </div>
</template>
