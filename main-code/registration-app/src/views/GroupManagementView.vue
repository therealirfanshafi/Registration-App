<template>
    <main>
        <div id="main-container">
            <div id="new-grp-container" class="card" :class="{blue: category == 'Junior', red: category == 'Senior'}">
                <h1>Create new group</h1>
                <label for="new-grp-input">Group Name</label>
                <input type="text" id="new-grp-input" v-model="newGroup">
                <p v-if="!validateGroupName">Group name already in use</p>
                <button @click="createNewGroup()" :class="{blue: category == 'Junior', red: category == 'Senior'}">Create Group</button>
            </div>
            <div id="manage-group-container" v-if="groups.length">
                <h1 style="color:rgb(189, 129, 18);">Manage Group Members</h1>
                <div id="manage-group-cards">
                    <div v-for="(item, index1) of groups" :key="index1" class="card" :class="{blue: category == 'Junior', red: category == 'Senior'}">
                        <h2>{{ item.name }}</h2>
                        <div class="group-member-add" v-if="item.members.length < 4 && item.isAdmin">
                            <label :for="`${item.name}-input`" style="font-size: 1rem;">New member email</label>
                            <input type="email" :id="`${item.name}-input`" v-model="item.memberReq">
                            <button @click="addMember(index1)" :class="{blue: category == 'Junior', red: category == 'Senior'}">Add member</button>
                            <p v-if="invalidEmail">Email does not exist</p>
                            <p v-if="memberAlreadyinGrp">Member already in group</p>
                            <p v-if="reqlAlreadySent">Request for this member already sent</p>
                        </div>
                        
                        <ul>
                            <li v-for="(grpMember, index2) of item.members" :key="index2">
                                <div>{{ `${grpMember}${item.adminName == grpMember ? ' (admin)' : ''}` }}</div>
                                <a @click="removeMember(index1, index2)" v-if="item.isAdmin && item.adminName !== grpMember"><font-awesome-icon icon="fa-solid fa-xmark" class="icon" style="background-color: red; border-radius: 100%"/></a>
                            </li>
                        </ul>
                        <button :class="{blue: category == 'Junior', red: category == 'Senior'}" @click="deleteGroup(index1)" v-if="item.isAdmin">Delete Group</button>
                    </div>
                </div>
            </div>
            <div id="manage-segments-container">
                <h1 style="color: rgb(189, 129, 18);">Manage Group segments</h1>
                <div class="card" :class="{blue: category == 'Junior', red: category == 'Senior'}">
                    <div v-for="(item, index1) of segments" :key="index1" class="group-segment-relators">
                        <label :for="item.name">{{ item.name }}</label>
                        <select :id="item.name" v-model="item.group">
                            <option value="null">None</option>
                            <option v-for="(group, index2) of groups" :key="index2" :value="group.name">{{ group.name }}</option>
                        </select>
                    </div>
                    <div id="button-container" v-if="JSON.stringify(oldSegments) !== JSON.stringify(segments)">
                        <button :class="{blue: category == 'Junior', red: category == 'Senior'}" @click="saveChanges()">Save Changes</button>
                        <button :class="{blue: category == 'Junior', red: category == 'Senior'}" @click="cancel()">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import pb from '@/pocketbase'
import { useMainStore } from '@/stores/mainStore';
import { mapStores } from 'pinia';
import type { RecordModel } from 'pocketbase';
import  { defineComponent } from 'vue';

export default defineComponent({
    async mounted() {
        if (!this.mainStore.loggedIn) {
            this.$router.replace({name: 'login'})
        } else if (!this.mainStore.verified) {
            this.$router.replace({name: 'verification'})
        }
        if (pb.authStore.model) {
            this.category = (await pb.collection('Category').getOne(pb.authStore.model.Category)).Category
            const groupsIntermediate = await pb.collection('Group').getFullList({
                expand: 'Admin, Members',
                filter: `Members.id ?= "${pb.authStore.model.id}"`
            })
            this.groups = groupsIntermediate.map((val) => Object.create({name: val.Name, members: val.expand ? val.expand.Members.map((val2: RecordModel) => val2.First_Name + ' ' + val2.Last_Name) : [], isAdmin: val.Admin == (pb.authStore.model ? pb.authStore.model.id: ''), adminName: val.expand ? val.expand.Admin.First_Name + ' ' + val.expand.Admin.Last_Name : '' ,memberReq: ''}))

            this.groupList = (await pb.collection('Group').getFullList({
                fields: 'Name'
            })).map((val) => val.Name.toLowerCase())
        }
    },

    computed: {
        validateGroupName() {
            return !this.groupList.includes(this.newGroup.toLowerCase())
        },

        ...mapStores(useMainStore)
    },

    data() {
        return {
            groups: [{name: '', members: [''], isAdmin: false, adminName: '', memberReq: ''}],
            groupList: [''],
            oldSegments: [{name: 'Mathsketeers', group: 'Very Smart Ppl'}, {name: 'Quick Mafs', group: 'I love maths'}, {name: 'Crisis Computerised', group: 'Very Smart People'}, {name: 'Robotics', group: null}],
            segments: [{name: 'Mathsketeers', group: 'Very Smart Ppl'}, {name: 'Quick Mafs', group: 'I love maths'}, {name: 'Crisis Computerised', group: 'Very Smart People'}, {name: 'Robotics', group: null}],
            newGroup: '',
            category: '',
            invalidEmail: false,
            memberAlreadyinGrp: false,
            reqlAlreadySent: false
        }
    },
    methods: {
        async createNewGroup() {
            if (this.validateGroupName && pb.authStore.model) {
                await pb.collection('Group').create({
                    Name: this.newGroup,
                    Admin: pb.authStore.model.id,
                    Members: [pb.authStore.model.id]
                })
                this.groups.push({name: this.newGroup, members: [pb.authStore.model.First_Name + pb.authStore.model.Last_Name], isAdmin: true, adminName: pb.authStore.model.First_Name + ' ' + pb.authStore.model.Last_Name , memberReq: ''})
                this.newGroup = ''
            }
        },
        async addMember(index: number) {
            this.invalidEmail = false
            this.memberAlreadyinGrp = false
            this.reqlAlreadySent = false

            
            let member: RecordModel[] | string = (await pb.collection('Participant').getFullList({
                fields: 'id',
                filter: `email = "${this.groups[index].memberReq}"`
            }))
            if (member.length == 0) {
                this.invalidEmail = true
            } else {
                member = member[0].id
                const groupIntermediate = (await pb.collection('Group').getFullList({
                    fields: 'id, Members',
                    filter: `Name = "${this.groups[index].name}"`
                }))[0]
                const grp = groupIntermediate.id
                const members: string[] = groupIntermediate.Members
                this.memberAlreadyinGrp = members.includes(member) 
                if (!this.memberAlreadyinGrp) {
                    try {
                        await pb.collection('Group_Requests').create({
                            Group: grp,
                            Participant: member
                        })
                    } catch {
                        this.reqlAlreadySent = true
                    }

                    
                }
            }

            this.groups[index].memberReq = ''
        },
        async deleteGroup(index: number) {
            if (confirm('Are you sure you want to delete this group')) {
                const grp = (await pb.collection('Group').getFullList({
                    fields: 'id',
                    filter: `Name = "${this.groups[index].name}"`
                }))[0].id

                await pb.collection('Group').delete(grp)

                this.groups.splice(index, 1)
            }
            
        },
        async removeMember(index1: number, index2: number) {
            if (confirm('Are you sure you want to remove this member?')) {
                const grp = (await pb.collection('Group').getFullList({
                    fields: 'id',
                    filter: `Name = "${this.groups[index1].name}"`
                }))[0].id
                const mem = await pb.collection('Participant').getFullList({
                    fields: 'id',
                    filter: `First_Name = "${this.groups[index1].members[index2].split(' ').slice(0, -1).join(' ')}" && Last_Name = "${this.groups[index1].members[index2].split(' ').pop()}"`
                })
                for (let ids of mem) {
                    try {
                        await pb.collection('Group').update(grp, {
                            'Members-': ids.id
                        })
                    } catch(e) {
                        console.log(e)
                    }
                }
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

p {
    color: rgb(189, 129, 18);
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
    color: white;
    border: none;
    font-size: 1.5rem;
    align-self: center;
    padding: 5px;
    min-width: 160px;
    margin: 20px;
}

button:hover, button:focus {
    cursor: pointer;
}

input, select {
    background-color: rgb(255, 255, 255, 0.3);
    border: 1px solid black;
    width: 90%;
}

.card {
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