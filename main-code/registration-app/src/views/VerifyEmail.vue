<template>
  <main>
    <button
      class="default-button"
      @click="
        mainStore.logout();
        $router.push({ name: 'title' })
      "
      style="align-self: last baseline"
    >
      Logout
    </button>
    <h1>A verification email has been sent. Verify your mail and then click this button</h1>
    <button class="default-button" @click="verify()">Completed Verificiation</button>
    <h1>Rerequest Verification</h1>
    <button class="default-button" @click="resend()">Resend</button>
  </main>
</template>

<script lang="ts">
import pb from '@/pocketbase'
import { useMainStore } from '@/stores/mainStore'
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  async mounted() {
    if (!this.mainStore.loggedIn) {
      this.$router.replace({ name: 'login' })
    } else if (this.mainStore.verified) {
      this.$router.replace({ name: 'home' })
    }
  },

  methods: {
    async verify() {
      await pb.collection('Participant').authRefresh()
      location.reload()
    },
    async resend() {
      if (pb.authStore.record) {
        await pb.collection('Participant').requestVerification(pb.authStore.record.email)
      }
    }
  },
  computed: {
    ...mapStores(useMainStore)
  }
})
</script>

<style scoped>
main {
  padding: 20px;
  color: #f57402;
}

h1 {
  text-align: center;
}

button {
  background-color: rgba(166, 81, 7, 0.5);
}

button:hover {
  background-color: rgba(128, 61, 3, 0.5);
}

main * {
  margin: 20px;
}
</style>
