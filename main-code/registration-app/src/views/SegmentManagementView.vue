<template>
    <main>
        <div id="button-container" v-if="JSON.stringify(oldSegments) !== JSON.stringify(segments)">
            <button @click="saveChanges(); $router.push({name: 'home'});">Save Changes</button>
            <button @click="cancel(); $router.push({name: 'home'})">Cancel</button>
        </div>
        <div id="main-container" :class="{blue: category == 'Junior', red: category == 'Senior'}">
            <h1>Select the segments you want to participate in</h1>
            <div v-for="(item, index) of segments" :key="index" class="segment-checkboxes">
                <label :for="item.name">{{ item.name }}</label>
                <input type="checkbox" :id="item.name" v-model="item.participate">
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
        }
    },
    computed: {
        ...mapStores(useMainStore)
    },

    data() {
        return {
            oldSegments:  [{name: 'Mathemine', participate: true}, {name: 'Mathsketeers', participate: false}, {name: 'Math Olympiad', participate: true}, {name: 'console.log("Code Jam")', participate: false}, {name: 'Robotics', participate: false}, {name: 'Sher Unlocked', participate: true}],
            segments: [{name: 'Mathemine', participate: true}, {name: 'Mathsketeers', participate: false}, {name: 'Math Olympiad', participate: true}, {name: 'console.log("Code Jam")', participate: false}, {name: 'Robotics', participate: false}, {name: 'Sher Unlocked', participate: true}],
            category: ''
        }
    },
    methods: {
        saveChanges() {
            this.oldSegments = JSON.parse(JSON.stringify(this.segments));
        },
        cancel() {
            this.segments = JSON.parse(JSON.stringify(this.oldSegments));
        }
    },
    beforeRouteLeave() {
        if (JSON.stringify(this.oldSegments) !== JSON.stringify(this.segments)) {
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
    background-color: rgb(51, 18, 116, 0.6);
    color: white;
    border: none;
    font-size: 1rem;
    align-self: center;
    padding: 5px;
    min-width: 100px;
}

#button-container button:hover, #button-container button:focus {
    background-color: rgba(35, 7, 89, 0.6);
    cursor: pointer;
}

input {
    width: 15px;
    height: 15px;
    margin-left: 20px;
}

.segment-checkboxes {
    margin: 20px;
}

@media screen and (min-width: 620px) {
    main {
        font-size: 1.5rem;
    }

    h1 {
        font-size: 2rem;
    }

    #button-container button {
        font-size: 1.5rem;
        min-width: 160px;
    }

    input {
        width: 20px;
        height: 20px;
    }

}

</style>
