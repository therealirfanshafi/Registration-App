import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      numSeats: 159,
      loggedIn: true
    }
  },
  actions: {
    login() {
      this.loggedIn = true
    },
    logout() {
      this.loggedIn = false
    }
  }
})
