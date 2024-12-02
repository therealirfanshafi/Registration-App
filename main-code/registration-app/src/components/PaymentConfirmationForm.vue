<template>
    <h1>Confirm Payment</h1>
    <form @submit.prevent="confirmPayment()">
        <div>
            <label for="payment-method">Payment Method</label>
            <select id="payment-method" v-model="paymentMethod">
                <option value="Bkash">Bkash</option>
                <option value="CA/BA">Campus / Batch Ambassador</option>
                <option value="Club Moderator">Club Moderator</option>
            </select>
        </div>

        <div v-if="paymentMethod == 'Bkash'">
            <label for="phone-number">Phone Number used for transaction</label>
            <input type="text" id="phone-number" v-model="phoneNumber" :class="{error: !validatePhoneNum && phoneNumber !== ''}">
            <label for="tran-id">Transaction ID</label>
            <input type="text" id="tran-id" v-model="tranID">
            <p class="error-message" v-if="!validatePhoneNum && phoneNumber !== ''">Invalid Phone Number</p>
            <p class="error-message" v-if="!validatePresence && submitCount > 0">The information is required</p>
            <p style="color: rgb(250, 179, 0);">Check your information for accuracy. You cannot change it once submitted</p>
        </div>
        <input type="submit" value="Submit" class="default-button">
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pb from '@/pocketbase';

export default defineComponent({
    data() {
        return {
            paymentMethod: 'Bkash',
            phoneNumber: pb.authStore.model.Phone_Number,
            tranID: '',
            submitCount: 0
        }
    },
    computed: {
        validatePhoneNum() {
        const regExp = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/
        return regExp.test(this.phoneNumber)
        },
        validatePresence() {
            return this.paymentMethod !== 'Bkash' || (this.phoneNumber != '' && this.tranID != '')
        }

    },
    methods: {
        async confirmPayment() {
            this.submitCount++
            if (this.validatePhoneNum && this.validatePresence) {
                await pb.collection('Payment_Info').create({
                    Participant: pb.authStore.model.id,
                    Payment_Method: this.paymentMethod,
                    Phone_Number: this.paymentMethod == 'Bkash' ? this.phoneNumber : '',
                    Tran_ID: this.paymentMethod == 'Bkash' ? this.tranID : ''
                })
                this.$router.push({name: 'home'})
            }
        }
    }
})
</script>

<style scoped>

h1 {
    text-align: center;
}

 form, div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

input, select, label {
    min-width: 200px;
    width: 35%;
}

div {
    margin: 20px;
}

.default-button {
    background-color: rgb(255, 255, 255, 0.3);
}

.default-button:hover,
.default-button:focus {
  background-color: rgba(196, 196, 196, 0.3);
  cursor: pointer;
}

.error {
  box-shadow: 0 0 5px 1px red;
}

.error-message {
  font-size: 0.75rem;
  color: rgb(250, 179, 0);
}

</style>