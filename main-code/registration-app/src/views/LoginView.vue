<template>
    <div>
        <LoginForm id="log-form"/>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {LoginForm}
})

</script>

<style scoped>
    div {
        display: flex;
        justify-content: center;
        padding-top: 100px;
        padding-bottom: 100px;
    }

    #log-form {
        width: 80%;
        max-width: 750px;
    }
</style>