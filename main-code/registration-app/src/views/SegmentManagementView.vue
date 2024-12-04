<template>
  <main>
    <div id="button-container" v-if="JSON.stringify(oldSegments) !== JSON.stringify(segments)">
      <button class="default-button" @click="saveChanges()">Save Changes</button>
      <button class="default-button" @click="cancel()">Cancel</button>
    </div>
    <div id="main-container" class="nutty-colour">
      <h1>Select the segments you want to participate in</h1>
      <div v-for="(item, index) of segments" :key="index" class="segment-checkboxes">
        <label :for="item.name">{{ item.name }}</label>
        <input type="checkbox" :id="item.name" v-model="item.participate" />
      </div>
      <h2>
        Register for group segemnts <RouterLink :to="{ name: 'groupManage' }">here</RouterLink>
      </h2>
    </div>
  </main>
</template>

<script lang="ts">
import pb from '@/pocketbase'

import { useMainStore } from '@/stores/mainStore'
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  async mounted() {
    if (!this.mainStore.loggedIn) {
      this.$router.replace({ name: 'login' })
    } else if (!this.mainStore.verified) {
      this.$router.replace({ name: 'verification' })
    }

    const segmentsIntermediate1 = await pb.collection('Solo_Segment_Participant').getFullList({
      fields: 'id, Segment',
      filter: `Participant = "${pb.authStore.record.id}"`
    })
    const SegmentIDs = segmentsIntermediate1.map((val) => val.Segment)
    const segmentsIntermediate2 = await pb.collection('Solo_Segment').getFullList()
    this.oldSegments = segmentsIntermediate2.map((val) =>
      Object.create({
        name: val.Name,
        participate: SegmentIDs.includes(val.id),
        segmentId: val.id,
        recordId: SegmentIDs.includes(val.id)
          ? segmentsIntermediate1.filter((val2) => val2.Segment == val.id)[0].id
          : ''
      })
    )
    this.segments = segmentsIntermediate2.map((val) =>
      Object.create({
        name: val.Name,
        participate: SegmentIDs.includes(val.id),
        segmentId: val.id,
        recordId: SegmentIDs.includes(val.id)
          ? segmentsIntermediate1.filter((val2) => val2.Segment == val.id)[0].id
          : ''
      })
    )
  },
  computed: {
    ...mapStores(useMainStore)
  },

  data() {
    return {
      oldSegments: [{ name: '', participate: false, segmentId: '', recordId: '' }],
      segments: [{ name: '', participate: false, segmentId: '', recordId: '' }]
    }
  },
  methods: {
    async saveChanges() {
      for (let i = 0; i < this.oldSegments.length; i++) {
        if (
          this.oldSegments[i].participate != this.segments[i].participate &&
          this.segments[i].participate
        ) {
          await pb.collection('Solo_Segment_Participant').create({
            Segment: this.oldSegments[i].segmentId,
            Participant: pb.authStore.record.id
          })
        } else if (this.oldSegments[i].participate != this.segments[i].participate) {
          await pb.collection('Solo_Segment_Participant').delete(this.segments[i].recordId)
          this.segments[i].recordId = ''
        }
      }
      this.oldSegments = await JSON.parse(JSON.stringify(this.segments))
      await this.$router.push({ name: 'home' })
    },
    cancel() {
      this.segments = JSON.parse(JSON.stringify(this.oldSegments))
      this.$router.push({ name: 'home' })
    }
  },
  beforeRouteLeave() {
    if (JSON.stringify(this.oldSegments) !== JSON.stringify(this.segments)) {
      if (confirm('Do you want to save changes')) {
        this.saveChanges()
      }
    }
  }
})
</script>

<style scoped>
main {
  font-size: 1rem;
  width: 80%;
}

h1 {
  font-size: 1.5rem;
  text-align: center;
}

h2 {
  text-align: center;
}

#button-container {
  align-self: last baseline;
}

#button-container button {
  margin: 20px;
  min-width: 100px;
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

  a {
    color: white;
  }
}
</style>
