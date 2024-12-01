<script setup lang="ts">
import { RouterView } from 'vue-router'
import CustomFooter from './components/CustomFooter.vue'
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useMainStore } from './stores/mainStore'
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
import pb from '@/pocketbase'

export default defineComponent({
  async mounted() {
    if (pb.authStore.model) {
      this.category = (await pb.collection('Category').getOne(pb.authStore.model.Category)).Category
    }
    this.dataReady = true
  },

  data() {
    return {
      category: '',
      dataReady: false
    }
  },

  computed: {
    ...mapStores(useMainStore)
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
