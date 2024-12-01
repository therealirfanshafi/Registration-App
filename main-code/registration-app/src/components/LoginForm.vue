<template>
  <main>
    <h1 id="title">Login</h1>
    <form @submit.prevent="authenticateUser()">
      <div class="logical-input-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          autocomplete="off"
          :class="{ error: !validateEmail && email !== '' }"
        />
        <p class="error-message" v-if="!validateEmail && email !== ''">Invalid email</p>
      </div>
      <div class="logical-input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <p
        class="error-message"
        style="align-self: center"
        v-if="!validatePresence && submitCount >= 1"
      >
        All fields are required
      </p>
      <p class="error-message" style="align-self: center" v-if="authFailCount >= 1">
        Email and password do not match
      </p>
      <input type="submit" value="Login" id="submit" />
    </form>
  </main>
</template>

<script lange="ts">
import pb from '@/pocketbase'
import { useMainStore } from '@/stores/mainStore'
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
      submitCount: 0,
      authFailCount: 0
    }
  },

  methods: {
    async authenticateUser() {
      this.submitCount++
      if (this.validateEmail && this.validatePresence) {
        try {
          await pb.collection('Participant').authWithPassword(this.email, this.password)
          this.mainStore.login()
        } catch {
          this.authFailCount += 1
        }
      }
    }
  },

  computed: {
    validateEmail() {
      const regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regExp.test(this.email)
    },

    validatePresence() {
      return this.email !== '' && this.password !== ''
    },

    ...mapStores(useMainStore)
  }
})
</script>

<style scoped>
form,
form * {
  display: flex;
  flex-direction: column;
}

form {
  padding: 40px;
  width: 80%;
  background-color: rgba(245, 116, 2, 0.5);
}

input {
  background-color: rgb(255, 255, 255, 0.3);
  border: 1px solid black;
}

#submit {
  min-width: 100px;
  width: 20%;
  align-self: center;
}

#submit:hover,
#submit:focus {
  background-color: rgba(196, 196, 196, 0.3);
  cursor: pointer;
}

.logical-input-group {
  margin: 10px;
}

#title {
  text-align: center;
}

.error {
  box-shadow: 0 0 5px 1px red;
}

.error-message {
  font-size: 0.75rem;
  color: rgb(250, 179, 0);
}

@media screen and (min-width: 620px) {
  #title {
    color: white;
  }
}

@media screen and (min-width: 841px) {
  main {
    font-size: 1.5rem;
  }

  #title {
    font-size: 4rem;
  }

  input {
    font-size: 1rem;
  }

  .logical-input-group {
    margin: 15px;
  }
}
</style>
