<template>
    <main>
        <div id="main-container">
            <div id="new-grp-container" class="card">
                <h1>Create new group</h1>
                <label for="new-grp-input">Group Name</label>
                <input type="text" id="new-grp-input" v-model="newGroup">
                <button @click="createNewGroup()">Create Group</button>
            </div>
            <div id="manage-group-container">
                <h1 style="color:rgb(189, 129, 18);">Manage Group Members</h1>
                <div id="manage-group-cards">
                    <div v-for="(item, index1) of groups" :key="index1" class="card">
                        <h2>{{ item.name }}</h2>
                        <div class="group-member-add" v-if="item.members.length < 4">
                            <label :for="`${item.name}-input`" style="font-size: 1rem;">New member email</label>
                            <input type="email" :id="`${item.name}-input`" v-model="item.memberReq">
                            <button @click="addMember(index1)">Add member</button>
                        </div>
                        
                        <ul>
                            <li v-for="(grpMember, index2) of item.members" :key="index2">
                                <div>{{ grpMember }}</div>
                                <a @click="removeMember(index1, index2)"><font-awesome-icon icon="fa-solid fa-xmark" class="icon" style="background-color: red; border-radius: 100%"/></a>
                            </li>
                        </ul>
                        <button @click="deleteGroup(index1)">Delete Group</button>
                    </div>
                </div>
            </div>
            <div id="manage-segments-container">
                <h1 style="color: rgb(189, 129, 18);">Manage Group segments</h1>
                <div class="card">
                    <div v-for="(item, index1) of segments" :key="index1" class="group-segment-relators">
                        <label :for="item.name">{{ item.name }}</label>
                        <select :id="item.name" v-model="item.group">
                            <option value="null">None</option>
                            <option v-for="(group, index2) of groups" :key="index2" :value="group.name">{{ group.name }}</option>
                        </select>
                    </div>
                    <div id="button-container" v-if="JSON.stringify(oldSegments) !== JSON.stringify(segments)">
                        <button @click="saveChanges()">Save Changes</button>
                        <button @click="cancel()">Cancel</button>
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
            groups: [{name: 'Very Smart Ppl', members: ['Some random name', 'Gojo Satoru', 'Hacker Man', 'I love computer science'], admin: true, memberReq: ''}, {name: 'I love maths', members: ['Mohammad Irfan Shafi', 'Ben Dover', 'Woah Woah Woah', 'Lebron James'], admin: true, memberReq: ''}, {name: 'Very Smart People', members: ['Mohammad Irfan Shafi', 'Ben Dover', 'Hello World', 'Nice Name'], admin: false, memberReq: ''}],
            oldSegments: [{name: 'Mathsketeers', group: 'Very Smart Ppl'}, {name: 'Quick Mafs', group: 'I love maths'}, {name: 'Crisis Computerised', group: 'Very Smart People'}, {name: 'Robotics', group: null}],
            segments: [{name: 'Mathsketeers', group: 'Very Smart Ppl'}, {name: 'Quick Mafs', group: 'I love maths'}, {name: 'Crisis Computerised', group: 'Very Smart People'}, {name: 'Robotics', group: null}],
            newGroup: '',
        }
    },
    methods: {
        createNewGroup() {
            this.groups.push({name: this.newGroup, members: [], admin: true, memberReq: ''})
            this.newGroup = ''
        },
        addMember(index: number) {
            this.groups[index].memberReq = ''
        },
        deleteGroup(index: number) {
            this.groups.splice(index, 1)
        },
        removeMember(index1: number, index2: number) {
            if (confirm('Are you sure you want to remove this member?')) {
                this.groups[index1].members.splice(index2, 1)
            }
        },
        saveChanges() {
            this.oldSegments = JSON.parse(JSON.stringify(this.segments));
        },
        cancel() {
            this.segments = JSON.parse(JSON.stringify(this.oldSegments));
        }
    },
    beforeRouteLeave() {
        if (JSON.stringify(this.oldSegments) !== JSON.stringify(this.segments)) {
            if (confirm("Do you want to save changes to your group segments")) {
                this.saveChanges()
            }
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
    display: flex;
    justify-content: space-between;
}

li div {
    margin-right: 10px;
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

#main-container, #new-grp-container, #manage-group-container, #manage-segments-container, #manage-group-cards, .group-member-add {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

#new-grp-container {
    width: 80%;
    margin-top: 100px;
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
    justify-content: space-around;
}

@media screen and (min-width: 620px) {
    h2 {
        font-size: 2rem;
    }

    li, label {
        font-size: 1.5rem;
    }

   
}

@media screen and (min-width: 750px) {
    #manage-group-cards {
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .card {
        width: auto;
    }
}

</style>