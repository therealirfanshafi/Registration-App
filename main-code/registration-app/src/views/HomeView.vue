<template>
    <main>
        <button id="logout" @click="mainStore.logout(); $router.push({name: 'title'})">Logout</button>
        <div class="card" id="payment-card">
            <h1>Payment</h1>
            <h2 style="text-align: center;" v-if="!paid">Complete the payment to earn your spot in the fest</h2>
            <p v-if="!paid">{{ mainStore.numSeats }} seats left</p>
            <h2 v-else>You have completed the payment. Enjoy the fest</h2>
            <button @click="$router.push({name: 'payment'})">Complete Payment</button>
        </div>
        <div class="card" id="segment-card">
            <h1>Your Segments</h1>
            <ul v-if="segments.length">
                <li v-for="(item, index) of segments" :key=index>{{ item }}</li>
            </ul>
            <h2 v-else>You did not register for any segment yet</h2>
            <button @click="$router.push({name: 'segmentManage'})">Edit</button>
        </div>
        <div class="card" id="group-card">
            <h1>Group Requests</h1>
            <ul id="grp-req-list" v-if="groupRequests.length">
                <li v-for="(item, index) of groupRequests" :key=index>
                    <div>{{ item }}</div> 
                    <div class="icon-container">
                        <a @click="acceptReq(index)"><font-awesome-icon icon="fa-solid fa-check" class="icon" style="background-color: green;"/></a>
                        <a @click="rejectReq(index)"><font-awesome-icon icon="fa-solid fa-xmark" class="icon" style="background-color: red;"/></a>
                    </div>
                </li>
            </ul>
            <h2 v-else>You have no requests</h2>
            <h1>Your Groups</h1>
            <ul v-if="yourGroups.length">
                <li v-for="(item, index) of yourGroups" :key=index>{{ item }}</li>
            </ul>
            <h2 v-else>You are currently not in any group</h2>
            <button @click="$router.push({name: 'groupManage'})">Manage Groups</button>
        </div>
        <div class="card" id="submission-card">
            <h1>Submissions</h1>
            <ul v-if="projects.length">
                <li v-for="(item, index) of projects" :key=index>{{ item }}</li>
            </ul>
            <button v-if="projects.length" @click="$router.push({name: 'projectSubmission'})">Manage Submissions</button>
            <h2 v-else>You are not registered for any segment that requires a project submission</h2>
        </div>
    </main>
</template>

<script lang="ts">
import { useMainStore } from '@/stores/mainStore';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';


export default defineComponent({

    mounted() {
        if (!this.mainStore.loggedIn) {
            this.$router.replace({name: 'login'})
        }
    },

    data() {
        return {
            segments: ["Math Olympiad", "Robotics", "Code Jam", "Sher Unlocked"],
            groupRequests: ["Yeah Boii", "Nerds", "Hello world"],
            yourGroups: ["Very Smart People", "I love maths", "Astronomers"],
            projects: ["Robotics", "Crisis Computerised", "Science fair"],
            paid: false
        }
    },

    methods: {
        acceptReq(index: number): void {
            this.yourGroups.push(this.groupRequests[index])
            this.groupRequests.splice(index, 1)
        },
        rejectReq(index: number): void {
            this.groupRequests.splice(index, 1)
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
}

h1 {
    font-size: 1.5rem;
    margin: 15px;
}

h2 {
    font-size: 1rem;
    margin-bottom: 5px;
    width: 98%;
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

button:hover, button:focus {
    background-color: rgba(35, 7, 89, 0.6);
    cursor: pointer;
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

#payment-card {
    align-items: center;
}

#logout {
    align-self: last baseline;
    margin: 20px;
}

#grp-req-list {
    width: 90%;
}

#grp-req-list li {
    display: flex;
    justify-content: space-between;
}

.icon {
    margin-left: 15px;
    border-radius: 100%;
    padding: 2px;
}

@media screen and (min-width: 635px) {
    main {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }


    #logout {
        grid-row-start: 1;
        grid-row-end: 2;
        justify-self: end;
        width: 200px;
    }

    #payment-card {
        grid-row-start: 2;
        grid-row-end: 3;
    }
    
    #segment-card {
        grid-row-start: 3;
        grid-row-end: 4;
    }

    #group-card {
        grid-row-start: 2;
        grid-row-end: 5; 
    }

    #submission-card {
        grid-row-start: 4;
        grid-row-end: 5;
    }

    #payment-card, #segment-card, #submission-card {
        grid-column-start: 1;
        grid-column-end: 2;
    }

    #logout, #group-card {
        grid-column-start: 2;
        grid-column-end: 3;
    }

}

@media screen and (min-width: 945px){

    h1 {
        font-size: 2rem;
        margin: 30px;
    }

    h2 {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }

    p {
        margin-bottom: 10px;
    }

    li {
        margin-bottom: 20px;
        font-size: 1.5rem;
    }

    button {
        font-size: 2rem;
        padding: 10px;
        margin-top: 20px;
        min-width: 200px;
    }

    .card {
        margin: 80px;
        padding: 20px;
    }
    
}

@media screen and (min-width: 1380px) {
    main {
        grid-template-columns: repeat(3, 1fr);
    }

    #segment-card {
        grid-row-start: 2;
        grid-row-end: 4;
    }

    #group-card {
        grid-row-start: 2;
        grid-row-end: 4; 
    }

    #submission-card {
        grid-row-start: 3;
        grid-row-end: 4;
    }

    #segment-card {
        grid-column-start: 2;
        grid-column-end: 3;
    }

    #logout, #group-card {
        grid-column-start: 3;
        grid-column-end: 4;
    }
}

</style>