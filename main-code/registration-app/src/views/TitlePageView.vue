<template>
  <main class="column-centering" v-if="dataReady">
    <h1>Sunnydale Math x Tech & Robotics Fest III</h1>
    <h3>Presented by: <br />Sunnydale Math x Tech Club & Sunnydale Robotics Club</h3>
    <h2>The fate of the world rests on your shoulders</h2>
    <h2>Can you fix the timeline?</h2>
    <div v-if="!mainStore.shutDown && numSeatsLeft > 0" id="registration-container">
      <p id="seat-count">{{ numSeatsLeft }} seats left</p>
      <div class="column-centering" id="sign-up-container">
        <p>What are you waiting for?</p>
        <RouterLink :to="{ name: 'registration' }">
          <button id="sign-up-button">Sign Up Today</button>
        </RouterLink>
      </div>
      <div class="column-centering" id="login-container">
        <p>Already signed up?</p>
        <RouterLink :to="{ name: 'login' }">
          <button id="login-button">Login Instead</button>
        </RouterLink>
      </div>
    </div>
    <div v-else id="shut-down">
      <h3>We have shut down registration. You may still login to see your details.</h3>
      <div class="column-centering" id="login-container">
        <RouterLink :to="{ name: 'login' }">
          <button id="login-button">Login</button>
        </RouterLink>
      </div>
    </div>
  </main>
  <LoadingSpinner v-else></LoadingSpinner>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import { mapStores } from 'pinia'
import pb from '@/pocketbase'

export default defineComponent({
  async mounted() {
    if (this.mainStore.loggedIn) {
      this.$router.replace({ name: 'home' })
    }
    if (this.mainStore.refreshFlag) {
      this.mainStore.refreshFlag = false
      location.reload()
    }
    const numSeatsLeftIntermediate = await pb.collection('Participant').getList(1, 300, {
      filter: 'Paid = true'
    })
    this.numSeatsLeft = 300 - numSeatsLeftIntermediate.items.length
    this.dataReady = true
  },

  data() {
    return {
      numSeatsLeft: 0,
      dataReady: false
    }
  },

  computed: {
    ...mapStores(useMainStore)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend+Peta:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lexend+Mega:wght@100..900&display=swap');

button {
  border: none;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
}

button:hover {
  background-color: rgba(12, 12, 12, 0.5);
}

h1,
h2,
h3 {
  font-style: normal;
  font-optical-sizing: auto;
  text-align: center;
}

h1 {
  font-family: 'Lexend Peta', sans-serif;
  font-size: 3rem;
  color: #f57402;
  margin-top: 150px;
  margin-bottom: 10px;
}

h2 {
  font-family: 'Lexend Mega', sans-serif;
  color: #ed9797;
  font-size: 1.5rem;
}

h3 {
  font-size: 1rem;
  margin-bottom: 30px;
}

p {
  font-size: 0.75rem;
}

#seat-count {
  color: #ff0000;
  margin: 30px;
}

#registration-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#shut-down {
  margin-top: 50px;
}

#sign-up-container {
  margin-bottom: 40px;
}

#sign-up-button {
  font-size: 2rem;
}

#login-container {
  margin-bottom: 50px;
}

#login-button {
  font-size: 1rem;
}

@media screen and (min-width: 620px) {
  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }

  #seat-count {
    margin: 50px;
  }

  #sign-up-button {
    font-size: 4rem;
  }

  #login-button {
    font-size: 2rem;
  }
}
</style>
