<template>
    <div>
        <RegistrationForm id="reg-form"/>
    </div>
    
</template>

<script>
import { defineComponent } from 'vue';
import RegistrationForm from '@/components/RegistrationForm.vue';

export default defineComponent({
    components: {RegistrationForm}
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