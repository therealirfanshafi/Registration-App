<template>
  <main v-if="dataReady">
    <button
      class="default-button"
      id="logout"
      @click="
        mainStore.logout();
        $router.push({ name: 'title' })
      "
    >
      Logout
    </button>
    <div class="card" id="payment-card" v-if="isActive">
      <h1>Payment</h1>
      <h2 style="text-align: center" v-if="!paid && !filledConfirmation">
        Confirm your payment to earn your spot in the fest.
      </h2>
      <p v-if="!paid && !filledConfirmation">{{ numSeatsLeft }} seats left</p>
      <h2 v-else-if="filledConfirmation && !paid">
        We will review your payment. You will receive a confirmation mail once verified.
      </h2>
      <h2 v-else>We have verified your payment. Enjoy the fest.</h2>
      <button
        class="default-button"
        @click="$router.push({ name: 'payment' })"
        v-if="!paid && !filledConfirmation"
      >
        Confirm Payment
      </button>
    </div>
    <div class="card" id="payment-card" v-else>
      <h1>Payment</h1>
      <h2 style="text-align: center" v-if="!paid && !filledConfirmation">
        You have not paid and can no longer pay.
      </h2>
      <p v-if="!paid && !filledConfirmation">{{ numSeatsLeft }} seats left</p>
      <h2 v-else-if="filledConfirmation && !paid">
        We will review your payment. You will receive a confirmation mail once verified.
      </h2>
      <h2 v-else>We have verified your payment. Enjoy the fest.</h2>
    </div>
    <div class="card" id="segment-card">
      <h1>Your Segments</h1>
      <ul v-if="segments.length">
        <li v-for="(item, index) of segments" :key="index">{{ item }}</li>
      </ul>
      <h2 v-else>You did not register for any segment yet</h2>
      <button
        class="default-button"
        @click="$router.push({ name: 'segmentManage' })"
        v-if="isActive"
      >
        Edit
      </button>
    </div>
    <div class="card" id="group-card">
      <h1 v-if="isActive">Group Requests</h1>
      <ul id="grp-req-list" v-if="groupRequests.length && isActive">
        <li v-for="(item, index) of groupRequests" :key="index">
          <div>{{ item }}</div>
          <div class="icon-container">
            <a @click="acceptReq(index)"
              ><font-awesome-icon
                icon="fa-solid fa-check"
                class="icon"
                style="background-color: green"
            /></a>
            <a @click="rejectReq(index)"
              ><font-awesome-icon
                icon="fa-solid fa-xmark"
                class="icon"
                style="background-color: red"
            /></a>
          </div>
        </li>
      </ul>
      <h2 v-else-if="isActive">You have no requests</h2>
      <h1>Your Groups</h1>
      <ul v-if="yourGroups.length">
        <li v-for="(item, index) of yourGroups" :key="index">{{ item }}</li>
      </ul>
      <h2 v-else>You are currently not in any group</h2>
      <button class="default-button" @click="$router.push({ name: 'groupManage' })" v-if="isActive">
        Manage Groups
      </button>
    </div>
    <div class="card" id="submission-card">
      <h1>Submissions</h1>
      <ul v-if="projects.length">
        <li v-for="(item, index) of projects" :key="index">
          <div>
            {{ item.segment }}
          </div>
          <div v-if="item.submitted" style="color: green">Done</div>
          <div v-else style="color: rgb(189, 129, 18)">Due</div>
        </li>
      </ul>
      <button
        class="default-button"
        v-if="projects.length"
        @click="$router.push({ name: 'projectSubmission' })"
      >
        Manage Submissions
      </button>
      <h2 v-else>You are not registered for any segment that requires a project submission</h2>
    </div>
  </main>
  <LoadingSpinner v-else />
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

    const segmentIntermediate1 = await pb.collection('Solo_Segment_Participant').getFullList({
      fields: 'Segment, expand',
      filter: `Participant = "${pb.authStore.record.id}"`,
      expand: 'Segment'
    })

    const groupsIntermediate = await pb.collection('Group').getFullList({
      fields: 'id, Name',
      filter: `Members.id ?= "${pb.authStore.record.id}"`
    })

    if (groupsIntermediate.length) {
      this.yourGroups = groupsIntermediate.map((val) => val.Name)
    } else {
      this.yourGroups = []
    }

    const segmentIntermediate2 = await pb.collection('Group_Segment_Group').getFullList({
      fields: 'Segment, expand, Submission',
      filter: `Group.Members.id ?= "${pb.authStore.record.id}"`,
      expand: 'Segment'
    })

    this.segments = []
    this.groupSegements = []
    if (segmentIntermediate1.length) {
      this.segments = [
        ...this.segments,
        ...segmentIntermediate1.map((val) => val.expand.Segment.Name)
      ]
    }

    if (segmentIntermediate2.length) {
      this.segments = [
        ...this.segments,
        ...segmentIntermediate2.map((val) => val.expand.Segment.Name)
      ]
      this.groupSegements = segmentIntermediate2.map((val) => val.expand.Segment.Name)
    }

    const grpReqIntermediate = await pb.collection('Group_Requests').getFullList({
      fields: 'expand',
      filter: `Participant = "${pb.authStore.record.id}"`,
      expand: 'Group'
    })

    if (grpReqIntermediate.length) {
      this.groupRequests = grpReqIntermediate.map((val) => val.expand.Group.Name)
    } else {
      this.groupRequests = []
    }

    this.projects = []
    this.projects = segmentIntermediate2
      .filter((val) => val.expand.Segment.Requires_Submission)
      .map((val) =>
        Object.create({ segment: val.expand.Segment.Name, submitted: val.Submission !== '' })
      )

    const numSeatsLeftIntermediate = await pb.collection('Participant').getList(1, 300, {
      filter: 'Paid = true'
    })
    this.numSeatsLeft = 300 - numSeatsLeftIntermediate.items.length

    this.filledConfirmation =
      (
        await pb
          .collection('Payment_Info')
          .getFullList({ filter: `Participant = "${pb.authStore.record.id}"` })
      ).length !== 0
    this.paid = (await pb.collection('Participant').getOne(pb.authStore.record.id)).Paid
    this.dataReady = true
  },

  data() {
    return {
      segments: [''],
      groupSegements: [''],
      groupRequests: [''],
      yourGroups: [''],
      projects: [{ segment: 'Something', submitted: false }],
      filledConfirmation: false,
      paid: false,
      numSeatsLeft: 0,
      dataReady: false
    }
  },

  methods: {
    async acceptReq(index: number) {
      const grp = (
        await pb.collection('Group').getFullList({
          fields: 'id',
          filter: `Name = "${this.groupRequests[index]}"`
        })
      )[0].id

      const thisGrpSegments = (
        await pb.collection('Group_Segment_Group').getFullList({
          fields: 'Segment.Name, expand',
          filter: `Group = "${grp}"`,
          expand: 'Segment'
        })
      ).map((val) => val.expand.Segment.Name)

      let isValid = true
      for (let temp1 of thisGrpSegments) {
        for (let temp2 of this.groupSegements) {
          if (temp1 == temp2) {
            isValid = false
            alert(
              `This group is registered for ${temp1} which one of your groups is also registered for. Solve this conflict to accept the group request`
            )
          }
        }
      }
      if (isValid) {
        await pb.collection('Group').update(grp, {
          'Members+': pb.authStore.record.id
        })

        try {
          const grpReq = (
            await pb.collection('Group_Requests').getFullList({
              fields: 'id',
              filter: `Group = "${grp}" && Participant = "${pb.authStore.record.id}"`
            })
          )[0].id

          await pb.collection('Group_Requests').delete(grpReq)
        } catch (e) {
          console.log(e)
        }

        this.yourGroups.push(this.groupRequests[index])
        this.groupRequests.splice(index, 1)
      }
    },
    async rejectReq(index: number) {
      const grpReq = (
        await pb.collection('Group_Requests').getFullList({
          fields: 'id',
          filter: `Group.Name = "${this.groupRequests[index]}" && Participant = "${pb.authStore.record.id}"`,
          expand: 'Group'
        })
      )[0].id

      await pb.collection('Group_Requests').delete(grpReq)
      this.groupRequests.splice(index, 1)
    }
  },

  computed: {
    isActive() {
      return !this.mainStore.shutDown && this.numSeatsLeft > 0
    },

    ...mapStores(useMainStore)
  }
})
</script>

<style scoped>
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
  margin-bottom: 10px;
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

#grp-req-list li,
#submission-card li {
  display: flex;
  justify-content: space-between;
}

.icon {
  margin-left: 15px;
  border-radius: 100%;
  padding: 2px;
}

#submission-card ul {
  width: 80%;
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

  #payment-card,
  #segment-card,
  #submission-card {
    grid-column-start: 1;
    grid-column-end: 2;
  }

  #logout,
  #group-card {
    grid-column-start: 2;
    grid-column-end: 3;
  }
}

@media screen and (min-width: 945px) {
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

  #logout,
  #group-card {
    grid-column-start: 3;
    grid-column-end: 4;
  }
}
</style>
