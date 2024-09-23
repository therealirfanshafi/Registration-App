<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CustomFooter from './components/CustomFooter.vue';
</script>

<template>
  
  <main id="view-container">
    <RouterView />
  </main>
  <footer>
    <CustomFooter></CustomFooter>
  </footer>
</template>

<style>
#view-container {
  background-image: url("./assets/MainCoverPosterAlternative.png");
  background-attachment: fixed;
  background-size: cover;
  background-position-x: center;
  background-position-y: 90%;
}

</style>
