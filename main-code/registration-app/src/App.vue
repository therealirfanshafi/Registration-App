<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CustomFooter from './components/CustomFooter.vue';
</script>

<template>
  
  <RouterView />
  <footer>
    <CustomFooter></CustomFooter>
  </footer>
</template>


