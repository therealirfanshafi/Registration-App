<template>
    something
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