<template>
    <main>
        <div>
            <h1 style="text-align: center;">Complete Payment using bkash</h1>
        </div>
    </main>
</template>

<script lang="ts">
import { useMainStore } from '@/stores/mainStore';
import { mapStores } from 'pinia';
import  { defineComponent } from 'vue';

export default defineComponent({
    mounted() {
        if (!this.mainStore.loggedIn) {
            this.$router.replace({name: 'login'})
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
    background-color: rgb(81, 42, 198, 0.4);
    width: 80%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>