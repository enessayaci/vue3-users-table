<template>
  <div>
    <label class="flex items-center cursor-pointer">
      <div class="relative">
        <input type="checkbox" class="sr-only" v-model="isDarkMode" @change="toggleDarkMode" />
        <div class="block bg-gray-300 w-12 h-7 rounded-full"></div>
        <div :class="toggleClass"
          class="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-300 z-10"></div>
        <span class="absolute right-1 top-0 w-5 h-full flex items-center">
          <IconSun />
        </span>
        <span class="absolute left-0.5 top-0 w-5 h-full flex items-center">
          <IconMoon />
        </span>
      </div>

    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import IconMoon from './icons/IconMoon.vue';
import IconSun from './icons/IconSun.vue';

const isDarkMode = ref(false); // Dark mode durumu

// Dark mode değişimini uygula
const toggleDarkMode = () => {
  const htmlElement = document.documentElement; // HTML elementini al
  if (isDarkMode.value) {
    htmlElement.classList.add('dark'); // Dark class ekle
    localStorage.setItem('theme', 'dark'); // Kullanıcı tercihlerini localStorage'a kaydet
  } else {
    htmlElement.classList.remove('dark'); // Dark class kaldır
    localStorage.setItem('theme', 'light'); // Kullanıcı tercihlerini localStorage'a kaydet
  }
};

// İlk yükleme sırasında kullanıcı tercihlerini kontrol et
onMounted(() => {
  // Local storage'dan tema tercihlerini kontrol et
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    isDarkMode.value = true; // Kullanıcının tercihi varsa dark mode'u aç
    document.documentElement.classList.add('dark'); // Dark class ekle
  } else {
    isDarkMode.value = false; // Aksi takdirde light mode
    document.documentElement.classList.remove('dark'); // Dark class kaldır
  }
});

const toggleClass = computed(() => {
  return isDarkMode.value ? 'transform translate-x-full' : ''; // Pozisyon değişimi için sınıf
});
</script>
