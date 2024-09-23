<template>
    <main style="display: flex; flex-direction: column; align-items: center;">
        <h1 style="margin-top: 150px; margin-bottom: 20px;">Sunnydale Math x Tech Fest 3</h1>
        <h2>
            The fate of the world rests on your shoulders
        </h2>
        <h2> Can you fix the timeline?</h2>
        <p style="color: #F3292D; margin: 50px;">{{ numSeatsLeft }} seats left</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; color: white;">
            <p>What are you waiting for</p>
            <button style="font-size: 4rem; border: none; color: white; padding: 10px;" class="multi-bg">
                Sign Up Today
            </button>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;  margin-bottom: 50px; color: white;">
            <p>Already signed up?</p>
            <button style="font-size: 2rem; border: none; color: white; padding: 10px;" class="multi-bg" >
                Login Instead
            </button>
        </div>
    </main>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMainStore } from '@/stores/mainStore';


export default defineComponent({
    data() {
        return {
            numSeatsLeft: useMainStore().numSeats
        }
    }
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend+Peta:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lexend+Mega:wght@100..900&display=swap');
h1 {
    font-size: 4rem;
    color: #35984E;
    font-family: "Lexend Peta", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
}

h2 {
    font-size: 2rem;
    font-family: "Lexend Mega", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    color: #ED9797;
}
</style>