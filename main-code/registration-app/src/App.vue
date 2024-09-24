<script setup lang="ts">
import {RouterView } from 'vue-router'
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

@media screen and (max-width: 620px) {
  #view-container {
    background-repeat: no-repeat;
    animation: slideshow 10s ease-in-out infinite;
  }

  @keyframes slideshow {
    0% { background-image: url("./assets/HomePageCoverJr.png");}
    50% { background-image: url("./assets/HomePageCoverSr.png");}
    100% { background-image: url("./assets/HomePageCoverJr.png");}
  }
}

</style>
