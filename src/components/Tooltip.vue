<script setup lang="ts">
import { ref } from 'vue';
import Button from './ui/Button.vue'
import IconInfo from './icons/IconInfo.vue';

const props = defineProps<{
  text?: string
}>();

const showTooltip = ref<boolean>(false)
const tooltipTogglerTimeout = ref()
const tooltipRef = ref()

function resetTooltipVisibility() {
  if (tooltipTogglerTimeout.value) {
    clearTimeout(tooltipTogglerTimeout.value)
    tooltipTogglerTimeout.value = null
  }

  if (!tooltipRef.value.classList.contains('opacity-0')) {
    tooltipRef.value.classList.add('opacity-0')
  }

  if (!tooltipRef.value.classList.contains('invisible')) {
    tooltipRef.value.classList.add('invisible')
  }

  if (tooltipRef.value.classList.contains('opacity-100')) {
    tooltipRef.value.classList.remove('opacity-100')
  }
}

function hideTooltip() {
  showTooltip.value = false

  if (tooltipTogglerTimeout.value) {
    clearTimeout(tooltipTogglerTimeout.value)
  }

  tooltipRef.value.classList.add('opacity-0')
  tooltipRef.value.classList.remove('opacity-100')

  tooltipTogglerTimeout.value = setTimeout(() => {
    showTooltip.value = false
    tooltipRef.value?.classList.add('invisible')

    clearTimeout(tooltipTogglerTimeout.value)
    tooltipTogglerTimeout.value = null
  }, 300)
}

function handleTooltipClick(forceClose = false) {
  if (forceClose) {
    hideTooltip()

    return;
  }

  if (!showTooltip.value) {

    showTooltip.value = true

    resetTooltipVisibility();
    tooltipRef.value.classList.remove('opacity-0')
    tooltipRef.value.classList.remove('invisible')
    tooltipRef.value.classList.add('opacity-100')

  } else {

    hideTooltip()
  }

}

const tooltipOuterTriangleClasses = "before:content-[''] before:absolute before:border-b-[6px] before:border-r-[5px] before:border-l-[5px] before:border-l-transparent before:border-r-transparent before:border-b-neutral-300 before:-rotate-90 before:top-1/2 before:right-full before:-mr-0.5"
const tooltipInnerTriangleClasses = "after:content-[''] after:absolute after:border-b-[4px] after:border-r-[4px] after:border-l-[4px] after:border-l-transparent after:border-r-transparent after:border-b-white after:-rotate-90 after:top-1/2 after:translate-y-[0.5px] after:right-full after:-mr-0.5"
const tooltipTriangleClasses = tooltipOuterTriangleClasses + " " + tooltipInnerTriangleClasses
const tooltipClasses = "text-neutral absolute top-1/2 left-full m-1 bg-white border border-neutral-100 -translate-y-2/3 shadow w-fit min-w-28 rounded-md text-xs p-1 transition-all duration-300 opacity-0 invisible"
const combinedTooltipClasses = tooltipTriangleClasses + " " + tooltipClasses

</script>

<template>
  <div id="componentTooltip" class="relative flex items-center">
    <Button type="button" tabindex="-1" variant="naked" @click="() => handleTooltipClick()" @blur="handleTooltipClick(true)"
      class="text-neutral-300 dark:text-neutral-600">
      <IconInfo />
    </Button>
    <div ref="tooltipRef" :class="combinedTooltipClasses">
      {{ props.text }}
    </div>
  </div>
</template>