<template>
    <main>
        <div id="button-container" v-if="changed">
            <button :class="{blue: category == 'Junior', red: category == 'Senior'}" @click="saveChanges()">Save Changes</button>
            <button :class="{blue: category == 'Junior', red: category == 'Senior'}" @click="cancel()">Cancel</button>
        </div>
        <div id="main-container" :class="{blue: category == 'Junior', red: category == 'Senior'}">
            <h1>Upload / Change your project for the following segments</h1>
            <div v-for="(item, index) of submissions.filter((val) => val.isAdmin)" :key="index" class="segment-checkboxes">
                <label :for="item.name">{{ item.name }}</label>
                <input type="file" :id="item.name" :ref="item.name" @change="detectChange(index, $event)">
                <a :href="item.fileUrl" v-if="item.fileUrl !== ''">View current submission</a>
            </div>
            <h2 v-if="submissions.filter((val) => !val.isAdmin).length">You are not the admin for the following segments</h2>
            <div>
                <ul>
                    <li v-for="(item, index) of submissions.filter((val) => !val.isAdmin)" :key="index">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import pb from '@/pocketbase';

import { useMainStore } from '@/stores/mainStore';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({

    async mounted() {
        if (!this.mainStore.loggedIn) {
            this.$router.replace({name: 'login'})
        }
        if (pb.authStore.model) {
            this.category = (await pb.collection('Category').getOne(pb.authStore.model.Category)).Category
            const subIntermediate = await pb.collection('Group_Segment_Group').getFullList({
                filter: `Group.Members.id ?= "${pb.authStore.model.id}" && Segment.Requires_Submission = true`,
                expand: 'Segment, Group'
            })


            this.submissions = subIntermediate.map((val) => Object.create({
                name: val.expand ? val.expand.Segment.Name : '', 
                isAdmin: val.expand ? val.expand.Group.Admin == (pb.authStore.model ? pb.authStore.model.id : '') : false,
                fileUrl: val.Submission !== '' ? `${pb.baseUrl}/api/files/${val.collectionId}/${val.id}/${val.Submission}` : '' ,
                file: '',
                recordID: val.id

            }))

        }

       
    },
    computed: {
        ...mapStores(useMainStore)
    },

    data() {
        return {
            submissions: [{name: '', isAdmin: false, fileUrl: '', file: '', recordID: ''}],
            category: '',
            changed: false
        }
    },
    methods: {
        detectChange(index: number, event: Event) {
            this.submissions[index].file = event.target ? event.target.files[0] : ''
            this.changed = true
        },

        async saveChanges() {
            for (let project of this.submissions) {
                if (project.file !== '') {
                    await pb.collection('Group_Segment_Group').update(project.recordID, {
                        Submission: project.file
                    })
                }
            }
            
        },
        cancel() {
            this.$router.push({name: 'home'})
        }
    },
    beforeRouteLeave() {
        if (this.changed) {
            if (confirm("Do you want to save changes")) {
                this.saveChanges()
            }
        }
    }

})

</script>

<style scoped>
main {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 1rem;
}

h1 {
    font-size: 1.5rem;
    text-align: center;
}

h2 {
    font-size: 1.25rem;
}

a {
    font-size: 1rem;
}

li {
    list-style: none;
}

#main-container {
    margin-top: 200px;
    margin-bottom: 200px;
    width: 80%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#button-container {
    align-self: last baseline;
}

#button-container button {
    margin: 20px;
    color: white;
    border: none;
    font-size: 1rem;
    align-self: center;
    padding: 5px;
    min-width: 100px;
}

#button-container button:hover, #button-container button:focus {
    cursor: pointer;
}


.segment-checkboxes, .segment-checkboxes div{
    display: flex;
    flex-direction: column;
}

.segment-checkboxes {
    margin: 20px;
    width: 100%;
}


@media screen and (min-width: 620px) {
    main {
        font-size: 1.5rem;
    }

    h1 {
        font-size: 2rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    #button-container button {
        font-size: 1.5rem;
        min-width: 160px;
    }

    a {
        color: white;
    }

    .segment-checkboxes {
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
    }
}

</style>
