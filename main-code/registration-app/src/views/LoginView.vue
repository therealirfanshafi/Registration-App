<template>
  <div>
    <LoginForm id="log-form" />
  </div>
</template>

<script lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import { useMainStore } from '@/stores/mainStore'
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { LoginForm },

  mounted() {
    if (!this.mainStore.verified && this.mainStore.loggedIn) {
      this.$router.push({ name: 'verification' })
    } else if (this.mainStore.loggedIn) {
      this.$router.replace({ name: 'home' })
    }
  },

  computed: {
    ...mapStores(useMainStore)
  }
})
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  padding-top: 100px;
  padding-bottom: 100px;
  width: 100%;
}

#log-form {
  width: 80%;
  max-width: 750px;
}
</style>
