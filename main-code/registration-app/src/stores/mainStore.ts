import { defineStore } from 'pinia'
import pb from '@/pocketbase/index'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      loggedIn: pb.authStore.isValid,
      verified: pb.authStore.model ? pb.authStore.model.verified : false,
      refreshFlag: false
    }
  },
  actions: {
    login() {
      this.loggedIn = true
      location.reload()
    },
    logout() {
      this.refreshFlag = true
      pb.authStore.clear()
      this.loggedIn = false
    },
    verify() {
      this.verified = true
    }
  }
})
