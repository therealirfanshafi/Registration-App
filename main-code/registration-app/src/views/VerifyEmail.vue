<template>
    <main>
        <button @click="mainStore.logout(); $router.push({name: 'title'})" :class="{blue: category == 'Junior', red: category == 'Senior'}" style="align-self: last baseline;">Logout</button>
        <h1>A verification email has been sent. Verify your mail and then click this button</h1>
        <button @click="verify()" :class="{blue: category == 'Junior', red: category == 'Senior'}">Completed Verificiation</button>
        <h1>Rerequest Verification</h1>
        <button @click="resend()" :class="{blue: category == 'Junior', red: category == 'Senior'}">Resend</button>
    </main>
</template>

<script lang="ts">
import pb from "@/pocketbase"
import { useMainStore } from "@/stores/mainStore";
import { mapStores } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
    async mounted() {
        if (!this.mainStore.loggedIn) {
            this.$router.replace({name: 'login'})
        } else if (this.mainStore.verified) {
            this.$router.replace({name: 'home'})
        }
        if (pb.authStore.model) {
            this.category = (await pb.collection('Category').getOne(pb.authStore.model.Category)).Category
        }
    },

    data() {
        return {
            category: ''
        }
    },

    methods: {
        async verify() {
            pb.collection('Participant').authRefresh()
            location.reload()
            
        },
        async resend() {
            if (pb.authStore.model) {
                await pb.collection('Participant').requestVerification(pb.authStore.model.email)
            }
        }
    },
    computed: {
        ...mapStores(useMainStore)
    }
})

</script>

<style scoped>
main {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgb(189, 129, 18);
}

h1 {
    text-align: center;
}

main * {
    margin: 20px;
}

button {
    color: white;
    border: none;
    font-size: 1.5rem;
    align-self: center;
    padding: 5px;
    min-width: 160px;
}

button:hover, button:focus {
    cursor: pointer;
}

</style>