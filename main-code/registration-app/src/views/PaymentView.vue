<template>
    <main>
        <div :class="{blue: category == 'Junior', red: category == 'Senior'}">
            <h1 style="text-align: center;">Complete Payment using bkash</h1>
        </div>
    </main>
</template>

<script lang="ts">

import pb from '@/pocketbase';

import { useMainStore } from '@/stores/mainStore';
import { mapStores } from 'pinia';
import  { defineComponent } from 'vue';

export default defineComponent({
    async mounted() {
        if (!this.mainStore.loggedIn) {
            this.$router.replace({name: 'login'})
        } else if (!this.mainStore.verified) {
            this.$router.replace({name: 'verification'})
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

    computed: {
        ...mapStores(useMainStore)
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

div {
    width: 80%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>