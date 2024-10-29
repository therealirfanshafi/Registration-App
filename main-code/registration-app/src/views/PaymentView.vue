<template>
  <main>
    <div :class="{ blue: category == 'Junior', red: category == 'Senior' }">
      <h1>
        Complete Payment by clicking the button below. The registration is fee is 2000 tk. Once paid
        your spot in the fest will be confirmed.
      </h1>
      <h1>
        Once you start payment, you need to complete it in 15 min, otherwise you have to start
        over.If payment is succesful, you will be sent a payment confirmation mail.
      </h1>
      <h1>
        You can also pay physically or through your campus ambassador in which case you will be sent
        a confirmation mail once we verify your payment.
      </h1>

      <button
        :class="{ blue: category == 'Junior', red: category == 'Senior' }"
        @click="completePayment()"
      >
        Complete payment
      </button>
    </div>
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
    } else if (!this.mainStore.verified) {
      this.$router.replace({ name: 'verification' })
    }
    this.category = (await pb.collection('Category').getOne(pb.authStore.model.Category)).Category
  },

  data() {
    return {
      category: ''
    }
  },

  computed: {
    ...mapStores(useMainStore)
  },

  methods: {
    async completePayment() {
      const res = await pb.send('/pay', {
        method: 'POST'
      })
      window.location = res.url
    }
  }
})
</script>

<style scoped>
main {
  padding-top: 200px;
  padding-bottom: 200px;
  display: flex;
  justify-content: center;
}

h1 {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

div {
  width: 80%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  color: white;
  border: none;
  font-size: 1.5rem;
  align-self: center;
  padding: 5px;
  min-width: 160px;
}

button:hover,
button:focus {
  cursor: pointer;
}

@media screen and (min-width: 600px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
