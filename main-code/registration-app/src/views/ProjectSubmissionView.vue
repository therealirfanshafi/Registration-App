<template>
  <main>
    <div
      id="button-container"
      v-if="JSON.stringify(oldSubmissions) !== JSON.stringify(submissions)"
    >
      <button class="default-button" @click="saveChanges()">Save Changes</button>
      <button class="default-button" @click="cancel()">Cancel</button>
    </div>
    <div id="main-container" class="nutty-colour">
      <h1>Upload / Change your project for the following segments</h1>
      <div
        v-for="(item, index) of submissions.filter((val) => val.isAdmin)"
        :key="index"
        class="segments"
      >
        <p>{{ item.name }}</p>
        <div class="logical-input-group">
          <label :for="item.name">Google Drive Link of File(s)</label>
          <input type="url" :id="item.name" v-model="item.link" />
        </div>
      </div>
      <h2 v-if="submissions.filter((val) => !val.isAdmin).length">
        You are not the admin for the following segments
      </h2>
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

    const subIntermediate = await pb.collection('Group_Segment_Group').getFullList({
      filter: `Group.Members.id ?= "${pb.authStore.model.id}" && Segment.Requires_Submission = true`,
      expand: 'Segment, Group'
    })

    this.oldSubmissions = subIntermediate.map((val) =>
      Object.create({
        name: val.expand.Segment.Name,
        isAdmin: val.expand.Group.Admin == pb.authStore.model.id,
        link: val.Submission,
        recordID: val.id
      })
    )

    this.submissions = subIntermediate.map((val) =>
      Object.create({
        name: val.expand.Segment.Name,
        isAdmin: val.expand.Group.Admin == pb.authStore.model.id,
        link: val.Submission,
        recordID: val.id
      })
    )
  },
  computed: {
    ...mapStores(useMainStore)
  },

  data() {
    return {
      oldSubmissions: [{ name: '', isAdmin: false, link: '', recordID: '' }],
      submissions: [{ name: '', isAdmin: false, link: '', recordID: '' }]
    }
  },
  methods: {
    async saveChanges() {
      try {
        for (let project of this.submissions) {
          await pb.collection('Group_Segment_Group').update(project.recordID, {
            Submission: project.link
          })
        }
        this.oldSubmissions = JSON.parse(JSON.stringify(this.submissions))
        this.$router.push({ name: 'home' })
      } catch {
        alert('Only google drive links can be input')
      }
    },
    cancel() {
      this.submissions = JSON.parse(JSON.stringify(this.oldSubmissions))
      this.$router.push({ name: 'home' })
    }
  },
  beforeRouteLeave() {
    if (JSON.stringify(this.oldSubmissions) !== JSON.stringify(this.submissions)) {
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

label {
  font-size: 1rem;
}

#button-container {
  align-self: last baseline;
}

#button-container button {
  margin: 20px;
  min-width: 100px;
}

.segments,
.segments div {
  display: flex;
  flex-direction: column;
}

.segments {
  margin: 20px;
  width: 100%;
}

.logical-input-group {
  flex-direction: column;
}

@media screen and (min-width: 700px) {
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

  .segments {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
