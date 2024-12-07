<template>
  <main>
    <h1 id="title">Sign Up</h1>
    <form @submit.prevent="createNewUser()" class="window-colour">
      <h3 style="text-align: center; color: rgb(250, 179, 0)">
        Warning: You cannnot change any information once you create the account.
      </h3>
      <div class="logical-input-group">
        <label for="full-name" style="flex-direction: row; align-items: last baseline;">Full Name<span style="font-size: 0.5rem; margin: 5px">(This will be used in certificates)</span></label>
        <input type="text" id="full-name" v-model="fullName" autocomplete="off" :class="{ error: !validateFullName && fullName !== '' }"/>
        <p class="error-message" v-if="!validateFullName && fullName !== ''">Invalid Full Name</p>
      </div>
      <div class="same-line">
        <div class="logical-input-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            autocomplete="off"
            :class="{ error: !validateEmail && email !== '' }"
          />
          <p class="error-message" v-if="!validateEmail && email !== ''">Invalid email</p>
          <p class="error-message" v-if="!validateEmailUniqueness && email !== ''">
            Email Already in Use
          </p>
        </div>
        <div class="logical-input-group">
          <label for="phone-number">Phone Number</label>
          <input
            type="tel"
            id="phone-number"
            v-model="phoneNumber"
            autocomplete="off"
            :class="{ error: !validatePhoneNum && phoneNumber !== '' && phoneNumber !== '+880' }"
          />
          <p
            class="error-message"
            v-if="!validatePhoneNum && phoneNumber !== '' && phoneNumber !== '+880'"
          >
            Invalid phone number
          </p>
        </div>
      </div>
      <div class="same-line">
        <div class="logical-input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            :class="{ error: !validatePassword && password !== '' }"
          />
          <p class="error-message" v-if="!validatePassword && password !== ''">
            Password must have at least 8 characters
          </p>
        </div>
        <div class="logical-input-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            :class="{ error: !validateConfirmPassword && confirmPassword !== '' }"
          />
          <p class="error-message" v-if="!validateConfirmPassword && confirmPassword !== ''">
            Passwords do not match
          </p>
        </div>
      </div>
      <div class="same-line">
        <div class="logical-input-group">
          <label for="school">School</label>
          <select id="school" v-model="school">
            <option v-for="(item, index) of schoolList" :key="index" :value="item.name">
              {{ item.name }}
            </option>
            <option value="Not Listed">My School is not listed here</option>
          </select>
          <label for="new-school" v-if="school == 'Not Listed'">Enter your school Name</label>
          <input type="text" id="new-school" v-if="school == 'Not Listed'" v-model="newSchool" />
        </div>

        <div class="logical-input-group">
          <label for="class">Class</label>
          <select id="class" v-model="grade">
            <option value="VIII">VIII</option>
            <option value="IX">IX</option>
            <option value="X">X</option>
            <option value="XI">XI</option>
            <option value="XII">XII</option>
          </select>
        </div>
      </div>
      <div class="logical-input-group" style="align-items: center" v-if="school == 'Sunnydale'">
        <p>Will you avail bus?</p>
        <div id="bus-avail-container">
          <div class="radio-options">
            <label for="bus-yes">Yes</label>
            <input type="radio" id="bus-yes" value="Yes" name="bus" v-model="willAvailBus" />
          </div>
          <div class="radio-options">
            <label for="bus-no">No</label>
            <input type="radio" id="bus-no" value="No" name="bus" v-model="willAvailBus" />
          </div>
        </div>
      </div>
      <div v-else-if="school !== ''">
        <p style="text-align: center;">Do you want to register as a Campus Ambassador?</p>
        <div id="ca-container">
          <div class="radio-options">
            <label for="ca-yes">Yes</label>
            <input type="radio" id="ca-yes" value="Yes" name="CA" v-model="isCA" />
          </div>
          <div class="radio-options">
            <label for="ca-no">No</label>
            <input type="radio" id="ca-no" value="No" name="bus" v-model="isCA" />
          </div>
        </div>
        <div v-if="isCA == 'Yes'">
          <label for="expected-number" style="text-align: center;">How many students do you expect to bring?</label>
          <input type="number" name="" id="expected-number" v-model="expectedNumber">
        </div>
      </div>
      <p
        class="error-message"
        style="align-self: center"
        v-if="!validatePresence && submitCount >= 1"
      >
        All fields are required
      </p>
      <input type="submit" value="Sign up" id="submit" />
      <p class="error-message" v-if="error">An unexpected error occured</p>
    </form>
  </main>
</template>

<script lang="ts">
import { useMainStore } from '@/stores/mainStore'
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import pb from '@/pocketbase'

export default defineComponent({
  async mounted() {
    const emailsUsed = await pb.collection('Participant').getFullList({
      fields: 'email'
    })
    emailsUsed.forEach((email) => {
      this.emailsUsed.push(email.email)
    })

    const schoolIntermediates = await pb.collection('Schools').getFullList({ sort: 'Name' })
    this.schoolList = schoolIntermediates.map((val) =>
      Object.create({ name: val.Name, id: val.id })
    )
  },

  data() {
    return {
      schoolList: [{ name: '', id: '' }],
      fullName: '',
      email: '',
      phoneNumber: '+880',
      password: '',
      confirmPassword: '',
      school: '',
      grade: '',
      willAvailBus: 'No',
      isCA: 'No',
      expectedNumber: 0,
      submitCount: 0,
      emailsUsed: [''],
      error: false,
      newSchool: ''
    }
  },

  methods: {
    async createNewUser() {
      this.submitCount++
      if (
        this.validateFullName &&
        this.validateEmail &&
        this.validateEmailUniqueness &&
        this.validatePhoneNum &&
        this.validatePassword &&
        this.validateConfirmPassword &&
        this.validatePresence
      ) {
        const category_id = (
          await pb.collection('Category').getList(1, 30, {
            filter: `Class = "${this.grade}"`
          })
        ).items[0].id
        try {
          let schoolID: string
          if (this.school == 'Not Listed') {
            schoolID = (await pb.collection('Schools').create({ Name: this.newSchool })).id
          } else {
            schoolID = this.schoolList.find((val) => val.name == this.school).id
          }

          const newParticipant = await pb.collection('Participant').create({
            email: this.email,
            emailVisibility: true,
            First_Name: this.fullName.split(' ').slice(0, -1).join(' '),
            Last_Name: this.fullName.split(' ').pop(),
            School: schoolID,
            Category: category_id,
            Phone_Number: this.phoneNumber,
            password: this.password,
            passwordConfirm: this.confirmPassword,
            Bus_Avail: this.willAvailBus == 'Yes',
            paid: false
          })

          if (this.isCA == 'Yes') {
            await pb.collection('CA_Reg').create({
              Participant: newParticipant.id,
              Expected_Number: this.expectedNumber
            })
          }

          await pb.collection('Participant').requestVerification(this.email)
          await pb.collection('Participant').authWithPassword(this.email, this.password)
          this.mainStore.login()
        } catch {
          this.error = true
        }
        location.reload()
        this.$router.push({ name: 'verification' })
      }
    }
  },

  computed: {
    validateFullName() {
      const regExp = /^[a-zA-Z]+(?:[-'][a-zA-Z]+)*(?: [a-zA-Z]+(?:[-'][a-zA-Z]+)*)+$/
      return regExp.test(this.fullName)
    },
    validateEmail() {
      const regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regExp.test(this.email)
    },

    validatePhoneNum() {
      const regExp = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/
      return regExp.test(this.phoneNumber)
    },

    validateEmailUniqueness() {
      return !this.emailsUsed.includes(this.email)
    },

    validatePassword() {
      return this.password.length >= 8
    },

    validateConfirmPassword() {
      return this.password === this.confirmPassword
    },

    validatePresence() {
      return (
        this.fullName !== '' &&
        this.email !== '' &&
        this.phoneNumber !== '' &&
        this.phoneNumber !== '+880' &&
        this.password !== '' &&
        this.confirmPassword !== '' &&
        this.school !== '' &&
        this.grade !== ''
      )
    },

    ...mapStores(useMainStore)
  }
})
</script>

<style scoped>
form,
form *,
.radio-options {
  display: flex;
  flex-direction: column;
}

form {
  padding: 40px;
}

input,
select {
  background-color: rgb(255, 255, 255, 0.3);
  border: 1px solid black;
}

#submit {
  min-width: 100px;
  width: 20%;
  align-self: center;
}

#submit:hover,
#submit:focus {
  background-color: rgba(196, 196, 196, 0.3);
  cursor: pointer;
}

.logical-input-group {
  margin: 10px;
}

#title {
  text-align: center;
  color: black;
}

#bus-avail-container, #ca-container {
  flex-direction: row;
  justify-content: center;
}

.radio-options {
  margin: 5px;
}

.error {
  box-shadow: 0 0 5px 1px red;
}

.error-message {
  font-size: 0.75rem;
  color: rgb(250, 179, 0);
}

@media screen and (min-width: 620px) {
  #title {
    color: white;
  }
}

@media screen and (min-width: 841px) {
  main {
    font-size: 1.5rem;
  }

  #title {
    font-size: 4rem;
  }

  input,
  select {
    font-size: 1rem;
  }

  .logical-input-group {
    margin: 15px;
  }

  .same-line {
    flex-direction: row;
    justify-content: space-between;
  }

  .same-line div {
    flex-basis: 45%;
  }
}
</style>
