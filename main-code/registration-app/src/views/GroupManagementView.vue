<template>
    <main>
        <div id="button-container">
            <button>Save Changes</button>
            <button>Cancel</button>
        </div>
        <div id="main-container">
            <div id="new-grp-container" class="card">
                <h1>Create new group</h1>
                <label for="new-grp-input">Group Name</label>
                <input type="text" id="new-grp-input">
                <button>Create Group</button>
            </div>
            <div id="manage-group-container">
                <h1 style="color:rgb(189, 129, 18);">Manage Group Members</h1>
                <div v-for="(item, index1) of groups" :key="index1" class="card">
                    <h2>{{ item.name }}</h2>
                    <button>Add member</button>
                    <ul>
                        <li v-for="(grpMember, index2) of item.members" :key="index2">{{ grpMember }}</li>
                    </ul>
                    <button>Delete Group</button>
                </div>
            </div>
            <div id="manage-segments-container">
                <h1 style="color:rgb(189, 129, 18);">Manage Group segments</h1>
                <div class="card">
                    <div v-for="(item, index1) of segments" :key="index1" class="group-segment-relators">
                        <label :for="item.name">{{ item.name }}</label>
                        <select :id="item.name">
                            <option value="null">None</option>
                            <option v-for="(group, index2) of groups" :key="index2" :value="group.name">{{ group.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
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
    },

    data() {
        return {
            groups: [{name: 'Very Smart Ppl', members: ['Some random name', 'Gojo Satoru', 'Hacker Man', 'I love computer science'], admin: true}, {name: 'I love maths', members: ['Mohammad Irfan Shafi', 'Ben Dover', 'Woah Woah Woah', 'Lebron James'], admin: true}, {name: 'Very Smart People', members: ['Mohammad Irfan Shafi', 'Ben Dover', 'Hello World', 'Nice Name'], admin: false}],
            segments: [{name: 'Mathsketeers', group: {name: 'Very Smart Ppl', members: ['Some random name', 'Gojo Satoru', 'Hacker Man', 'I love computer science'], admin: true}}, {name: 'Quick Mafs', group: {name: 'I love maths', members: ['Mohammad Irfan Shafi', 'Ben Dover', 'Woah Woah Woah', 'Lebron James'], admin: true}}, {name: 'Crisis Computerised', group: {name: 'Very Smart People', members: ['Mohammad Irfan Shafi', 'Ben Dover', 'Hello World', 'Nice Name'], admin: false}}, {name: 'Robotics', group: null}]
        }
    }

})

</script>

<style scoped>

main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    font-size: 2rem;
    margin-bottom: 10px;
    text-align: center;
}

h2 {
    font-size: 1.5rem;
    margin-bottom: 5px;
    width: 98%;
    text-align: center;
}

li {
    list-style-type: none;
    margin-bottom: 10px;
    font-size: 1rem;
}

button {
    background-color: rgb(51, 18, 116, 0.6);
    color: white;
    border: none;
    font-size: 1.5rem;
    align-self: center;
    padding: 5px;
    min-width: 160px;
    margin: 20px;
}

button:hover, button:focus {
    background-color: rgba(35, 7, 89, 0.6);
    cursor: pointer;
}

input, select {
    background-color: rgb(255, 255, 255, 0.3);
    border: 1px solid black;
    width: 90%;
}

.card {
    background-color: rgb(81, 42, 198, 0.4);
    width: 80%;
    margin-bottom: 40px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: first baseline;
}

.card h2 {
    align-self: center;
}

#main-container, #new-grp-container, #manage-group-container, #manage-segments-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

#new-grp-container {
    width: 80%;
}

#button-container {
    align-self: last baseline;
}

#button-container button {
    margin: 20px;
}

.group-segment-relators {
    display: flex;
    flex-direction: column;
    flex-basis: 40%;
    margin: 20px;
}

#manage-segments-container .card {
    flex-direction: row;
    flex-wrap: wrap;
}

</style>