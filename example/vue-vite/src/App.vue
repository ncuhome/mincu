<script setup lang="ts">
import Fallback from './components/Fallback.vue';
import Ready from './components/Ready.vue';
import Home from './Home.vue'
</script>

<template>
  <Ready :fallback="Fallback">
    <Home></Home>
  </Ready>
</template>
