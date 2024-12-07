<template>
  <main v-if="dataReady">
    <div class="window-colour">
      <h1>Registration Fee: 2000 tk</h1>
      <h2>Payment Procedures</h2>
      <h3>Physical Payment Procedure</h3>
      <p>
        Submit 2000tk to the campus ambassador / batch ambassador of your institution if available
      </p>
      <h3>Bkash Payment Procedure (Preffered)</h3>
      <ul>
        <li>Use the "Send Money" feature on Bkash to send the fee.</li>
        <li>When paying, include your full name and institution details in the reference.</li>
        <li>
          Use the Bkash number 01716657921, and the total amount to be paid is Tk 2,040 (Tk 2,000
          fee + Tk 40 service charge).
        </li>
      </ul>

      <h2 id="payment-confirmation-instruction">
        Once complete, fill out the details below to record your payment. We will verify the payment
        and once complete, a payment confirmation mail will be sent to you. If you do not record
        your payment, you will not be considered for the event.
      </h2>
    </div>
    <div class="window-colour">
      <PaymentConfirmationForm></PaymentConfirmationForm>
    </div>
  </main>
  <LoadingSpinner v-else></LoadingSpinner>
</template>

<script lang="ts">
import PaymentConfirmationForm from '@/components/PaymentConfirmationForm.vue'
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

    const filledConfirmation =
      (
        await pb
          .collection('Payment_Info')
          .getFullList({ filter: `Participant = "${pb.authStore.record.id}"` })
      ).length !== 0
    const paid = (await pb.collection('Participant').getOne(pb.authStore.record.id)).Paid

    if (filledConfirmation && paid) {
      this.$router.replace({ name: 'home' })
    }
    this.dataReady = true
    
  },
  
  data() {
    return {
      dataReady: false
    }
  },

  computed: {
    ...mapStores(useMainStore)
  },

  components: { PaymentConfirmationForm }
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

h2,
h3,
p {
  align-self: first baseline;
}

li {
  list-style: disc;
}

h2,
h3 {
  text-align: left;
  text-decoration: underline;
}

h2 {
  margin-bottom: 10px;
}

h3 {
  margin-top: 10px;
}

div {
  width: 80%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}

button {
  color: white;
  border: none;
  font-size: 1.5rem;
  align-self: center;
  padding: 5px;
  min-width: 160px;
}

#payment-confirmation-instruction {
  text-decoration: none;
  align-self: center;
  margin-top: 20px;
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
