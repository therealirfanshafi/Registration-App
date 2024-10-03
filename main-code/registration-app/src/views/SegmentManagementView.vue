<template>
    <main>
        <div id="main-container">
            <h1>Select the segments you want to participate in</h1>
            <div v-for="(item, index) of segments" :key="index" class="segment-checkboxes">
                <label :for="item.name">{{ item.name }}</label>
                <input type="checkbox" :id="item.name" v-model="item.participate">
            </div>
        </div>
        
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            oldSegments:  [{name: 'Mathemine', participate: true}, {name: 'Mathsketeers', participate: false}, {name: 'Math Olympiad', participate: true}, {name: 'console.log("Code Jam")', participate: false}, {name: 'Robotics', participate: false}, {name: 'Sher Unlocked', participate: true}],
            segments: [{name: 'Mathemine', participate: true}, {name: 'Mathsketeers', participate: false}, {name: 'Math Olympiad', participate: true}, {name: 'console.log("Code Jam")', participate: false}, {name: 'Robotics', participate: false}, {name: 'Sher Unlocked', participate: true}]
        }
    }
})

</script>

<style scoped>
main {
    padding-top: 200px;
    padding-bottom: 200px;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 1.5rem;
}

h1 {
    font-size: 2rem;
    text-align: center;
}

#main-container {
    background-color: rgb(81, 42, 198, 0.4);
    width: 80%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

input {
    width: 20px;
    height: 20px;
    margin-left: 20px
}

.segment-checkboxes {
    margin: 20px;
}
</style>
