import { defineStore } from 'pinia'
import  pb from '@/pocketbase/index'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      numSeats: 159,
      loggedIn: pb.authStore.isValid,
      verified: pb.authStore.model ? pb.authStore.model.verified : false
    }
  },
  actions: {
    login() {
      this.loggedIn = true
    },
    logout() {
      pb.authStore.clear()
      this.loggedIn = false
    },
    verify() {
      this.verified = true
    }
  }
})
