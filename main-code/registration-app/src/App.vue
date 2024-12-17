<script setup lang="ts">
import { RouterView } from 'vue-router'
import CustomFooter from './components/CustomFooter.vue'
import { defineComponent } from 'vue'
</script>

<template>
  <main class="main" v-if="dataReady">
    <RouterView />
  </main>
  <footer>
    <CustomFooter></CustomFooter>
  </footer>
</template>

<script lang="ts">
export default defineComponent({
  async mounted() {
    this.dataReady = true
  },

  data() {
    return {
      dataReady: false
    }
  }
})
</script>

<style scoped>
.main {
  background-image: url('./assets/MainCoverPoster.png');
  background-attachment: fixed;
  background-size: cover;
  background-position-x: center;
  background-position-y: 90%;
}
</style>
