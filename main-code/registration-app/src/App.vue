<script setup lang="ts">
import { RouterView } from 'vue-router'
import CustomFooter from './components/CustomFooter.vue'
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useMainStore } from './stores/mainStore'
</script>

<template>
  <main
    :class="{
      'logged-out': !mainStore.loggedIn,
      'logged-in-jr': mainStore.loggedIn && category == 'Junior',
      'logged-in-sr': mainStore.loggedIn && category == 'Senior'
    }"
    v-if="dataReady"
  >
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

<style>
.logged-out {
  background-image: url('./assets/MainCoverPosterAlternative.png');
  background-attachment: fixed;
  background-size: cover;
  background-position-x: center;
  background-position-y: 90%;
}

.logged-in-jr {
  background-image: url('./assets/HomePageCoverJr.png');
  background-attachment: fixed;
  background-size: cover;
  background-position-x: center;
  background-position-y: 90%;
}

.logged-in-sr {
  background-image: url('./assets/HomePageCoverSr.png');
  background-attachment: fixed;
  background-size: cover;
  background-position-x: center;
  background-position-y: 90%;
}

@media screen and (max-width: 620px) {
  .logged-out {
    background-repeat: no-repeat;
    animation: slideshow 10s ease-in-out infinite;
  }

  @keyframes slideshow {
    0% {
      background-image: url('./assets/HomePageCoverJr.png');
    }
    50% {
      background-image: url('./assets/HomePageCoverSr.png');
    }
    100% {
      background-image: url('./assets/HomePageCoverJr.png');
    }
  }
}
</style>
