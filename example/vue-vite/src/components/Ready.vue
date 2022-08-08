<script setup lang="ts">
import { ref } from 'vue';
import { mincu } from 'mincu-vanilla'

defineProps<{
  fallback: any
}>();

const ready = ref(mincu.isReady && mincu.isApp)

</script>

<template>
  <template v-if="ready">
    <slot></slot>
  </template>

  <template v-if="!ready">
    <component :is="fallback"></component>
  </template>
</template>