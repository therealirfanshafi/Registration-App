import { defineStore } from 'pinia'
import  pb from '@/pocketbase/index'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      numSeats: 159,
      loggedIn: pb.authStore.isValid
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
