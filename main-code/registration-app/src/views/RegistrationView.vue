<template>
    <div>
        <RegistrationForm id="reg-form"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegistrationForm from '@/components/RegistrationForm.vue';
import { useMainStore } from '@/stores/mainStore';
import { mapStores } from 'pinia';

export default defineComponent({
    components: { RegistrationForm },
    mounted() {
        if (this.mainStore.loggedIn) {
            this.$router.replace({name: 'home'})
        }
    },

    computed: {
        ...mapStores(useMainStore)
    }
})

</script>

<style scoped>
    div {
        display: flex;
        justify-content: center;
        padding-top: 100px;
        padding-bottom: 100px;
    }

    #reg-form {
        width: 80%;
        max-width: 750px;
    }
</style>