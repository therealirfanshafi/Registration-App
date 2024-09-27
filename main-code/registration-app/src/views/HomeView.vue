<template>
    <main>
        <button id="logout">Logout</button>
        <div class="card" id="payment">
            <h1>Complete Payment</h1>
            <h2>Complete the payment to earn your spot in the fest</h2>
            <p>{{ mainStore.numSeats }} seats left</p>
            <button>Complete Payment</button>
        </div>
        <div class="card">
            <h1>Your Segments</h1>
            <ul>
                <li v-for="(item, index) of soloSegments" :key=index>{{ item }}</li>
            </ul>
            <button>Edit</button>
        </div>
        <div class="card">
            <h1>Group Requests</h1>
            <ul>
                <li v-for="(item, index) of groupRequests" :key=index><span>{{ item }}</span> <span><font-awesome-icon class="icon" icon="fa-solid fa-check" size="6x"/></span></li>
            </ul>
            <h1>Your Groups</h1>
            <ul>
                <li v-for="(item, index) of yourGroups" :key=index>{{ item }}</li>
            </ul>
            <button>Manage Groups</button>
        </div>
        <div class="card">
            <h1>Projects</h1>
            <ul>
                <li v-for="(item, index) of projects" :key=index>{{ item }}</li>
            </ul>
            <button>Manage Submissions</button>
        </div>
    </main>
</template>

<script lang="ts">
import { useMainStore } from '@/stores/mainStore';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        return {
            soloSegments: ["Math Olympiad", "Robotics", "Code Jam", "Sher Unlocked"],
            groupRequests: ["Yeah Boii", "Nerds", "Hello world"],
            yourGroups: ["Very Smart People", "I love maths", "Astronomers"],
            projects: ["Robotics", "Crisis Computerised", "Science fair"]
        }
    },

    computed: {
        ...mapStores(useMainStore)
    },
})

</script>

<style scoped>

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}

h1 {
    font-size: 1.5rem;
    margin: 15px;
}

h2 {
    font-size: 1rem;
    margin-bottom: 5px;
}

p {
    margin-bottom: 5px;
    color: red;
}

li {
    list-style-type: none;
    margin-bottom: 10px
}

button {
    background-color: rgb(51, 18, 116, 0.6);
    color: white;
    border: none;
    font-size: 1.5rem;
    align-self: center;
    padding: 5px;
    min-width: 160px;
}

.card {
    background-color: rgb(81, 42, 198, 0.4);
    width: 80%;
    margin: 40px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: first baseline;
}

#payment {
    align-items: center;
}

#logout {
    align-self: last baseline;
    margin: 20px;
}

</style>