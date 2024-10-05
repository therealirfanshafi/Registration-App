<template>
    <main>
        <h1 id="title">Sign Up</h1>
        <form class="multi-bg" @submit.prevent="createNewUser()">
            <div class="logical-input-group">
                <label for="full-name">Full Name</label>
                <input type="text" id="full-name" v-model="fullName" autocomplete="off">
            </div>
            <div class="same-line">
                <div class="logical-input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" autocomplete="off" :class="{error: !validateEmail && email !== ''}">
                    <p class="error-message" v-if="!validateEmail && email !== ''">Invalid email</p>
                </div>
                <div class="logical-input-group">
                    <label for="phone-number">Phone Number</label>
                    <input type="tel" id="phone-number" v-model="phoneNumber" autocomplete="off" :class="{error: !validatePhoneNum && phoneNumber !== '' && phoneNumber !== '+880'}">
                    <p class="error-message" v-if="!validatePhoneNum && phoneNumber !== '' && phoneNumber !== '+880'">Invalid phone number</p>
                </div>
            </div>
            <div class="same-line">
                <div class="logical-input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" :class="{error: !validatePassword && password !== ''}">
                    <p class="error-message" v-if="!validatePassword && password !== ''">Password must have at least 8 characters</p>
                </div>
                <div class="logical-input-group">
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" v-model="confirmPassword" :class="{error: !validateConfirmPassword && confirmPassword !== ''}">
                    <p class="error-message" v-if="!validateConfirmPassword && confirmPassword !== ''">Passwords do not match</p>
                </div>
                
            </div>
            <div class="same-line">
                <div class="logical-input-group">
                    <label for="school">School</label>
                    <select id="school" v-model="school">
                        <option value="Sunnydale">Sunnydale</option>
                        <option value="Mastermind">Mastermind</option>
                        <option value="Scholastica">Scholastica</option>
                    </select>
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

                <div class="logical-input-group">
                    <label for="date-of-birth">Date of Birth</label>
                    <input type="date" id="date-of-birth" v-model="dateOfBirth" :class="{error: !validateDateOfBirth && dateOfBirth !== '2025-01-01'}">
                    <p class="error-message" v-if="!validateDateOfBirth && dateOfBirth !== '2025-01-01'">Your age must be at least 13</p>
                </div>
            
            </div>
            <div class="logical-input-group" style="align-items: center;" v-if="school=='Sunnydale'">
                <p>Will you avail bus?</p>
                <div id="bus-avail-container">
                    <div class="radio-options">
                        <label for="yes">Yes</label>
                        <input type="radio" id="yes" value="Yes" name="bus" v-model="willAvailBus">
                    </div>
                    <div class="radio-options">
                        <label for="no">No</label>
                        <input type="radio" id="no" value="No" name="bus" v-model="willAvailBus">
                    </div>
                </div>
            </div>
            <p class="error-message" style="align-self: center;" v-if="!validatePresence && submitCount >= 1">All fields are required</p>
            <input type="submit" value="Sign up" id="submit">
        </form>
    </main>      
</template>

<script lang="ts">
import { useMainStore } from '@/stores/mainStore';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            fullName: '',
            email: '',
            phoneNumber: '+880',
            password: '',
            confirmPassword: '',
            school: '',
            grade: '',
            dateOfBirth: '2025-01-01',
            willAvailBus: 'No',
            submitCount: 0
        }
    },


    methods: {
        createNewUser() {
            this.submitCount++
            if (this.validateEmail && this.validatePhoneNum && this.validatePassword && this.validateConfirmPassword && this.validateDateOfBirth && this.validatePresence) {
                this.mainStore.login()
                this.$router.push({name: 'home'})
            }
        }
    },

    computed: {
        validateEmail() {
            const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regExp.test(this.email)
        },

        validatePhoneNum() {
            const regExp = /^\+?[0-9-]*[0-9]{11,}$/
            return regExp.test(this.phoneNumber)
        },

        validatePassword() {
            return this.password.length >= 8
        },

        validateConfirmPassword() {
            return this.password === this.confirmPassword
        },

        validateDateOfBirth() {
            return Number(new Date()) - Number(new Date(this.dateOfBirth)) >= 409968000
        },

        validatePresence() {
            return this.fullName !== '' && this.email !== '' && this.phoneNumber !== '' && this.phoneNumber !== '+880' && this.password !== '' && this.confirmPassword !== '' && this.school !== '' && this.grade !== '' && this.dateOfBirth !== '2025-01-01';
        },

        ...mapStores(useMainStore)
    } 

})

</script>

<style scoped>

form, form *, .radio-options {
    display: flex;
    flex-direction: column;
}

form {
    padding: 40px;
}

input, select {
    background-color: rgb(255, 255, 255, 0.3);
    border: 1px solid black;
}

#submit {
    min-width: 100px;
    width: 20%;
    align-self: center;
}

#submit:hover, #submit:focus {
    background-color: rgba(196, 196, 196, 0.3);
    cursor: pointer;
}

.logical-input-group {
    margin: 10px
}

#title {
    text-align: center;
    color: black
}

#bus-avail-container {
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

    input, select {
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