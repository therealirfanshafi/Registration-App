<template>
    <main>
        <div id="contact-form">
            <h1>Contact form</h1>
            <input type="email" placeholder="Your email" v-model="email">
            <input type="text" placeholder="Your Name" v-model="name">
            <input type="text" placeholder="Your school" v-model="school">
            <textarea placeholder="Message" v-model="message"></textarea>
            <button style="min-height: 46px; min-width: 143px; margin: 5px; background-color: #444444; color: white; font-size: 1.5rem;" @click="sendMessage()">Submit</button>
        </div>
        <div id="our-socials">
            <h1>Our Socials</h1>
            <div class="icon-container">
                <a href="https://www.instagram.com/sdmathxtech?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><font-awesome-icon class="icon" icon="fa-brands fa-instagram" size="6x"/></a>
                <a href="https://www.facebook.com/people/Sunnydale-Math-X-Tech-Club/100088497041602/?mibextid=ZbWKwL"><font-awesome-icon class="icon" icon="fa-brands fa-facebook" size="6x"/></a>
            </div>
            
        </div>
        <div id="developer-socials">
            <h1>Site Developer Socials</h1>
            <div class="icon-container">
                <a href="https://www.instagram.com/therealirfanshafi/?next=%2F"><font-awesome-icon class="icon" icon="fa-brands fa-instagram" size="6x"/></a>
                <a href="https://github.com/therealirfanshafi"><font-awesome-icon class="icon" icon="fa-brands fa-github" size="6x"/></a>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import pb from '@/pocketbase';
import { defineComponent } from 'vue';

export default defineComponent({

    async mounted() {
        if (pb.authStore.model) {
            this.school = (await pb.collection('Participant').getOne(pb.authStore.model.id, {expand: 'School'})).expand.School.Name
        }
    },

    data() {
        return {
            email: pb.authStore.model ? pb.authStore.model.email : '',
            name: pb.authStore.model ? pb.authStore.model.First_Name + ' ' + pb.authStore.model.Last_Name : '',
            school: '',
            message: ''
        }
    },
    methods: {
        async sendMessage() {
            if (this.email !== '' && this.name !== '' && this.school !== '' && this.message !== '') {
                await pb.send("/contact-us", {
                    method: 'POST',
                    body: {
                       "email": this.email,
                        "name": this.name,
                        "school": this.school,
                        "message": this.message
                    },
                })
                this.message = ''
                alert('Email has been sent')
            }
        }
    }
})

</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
    
    main {
        background-color: #1B1A1A;
        font-family: "Inter", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        padding-top: 60px;
    }

    h1 {
        font-size: 1.5rem;
    }

    #contact-form, #our-socials, #developer-socials {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .icon-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    input, textarea {
        margin: 5px;
        padding: 5px;
        background-color: #D9D9D9;
        border: none;
        min-height: 35px;
        width: 227px;
    }

    input {
        font-size: 1.25rem;
    }

    textarea {
        min-height: 99px; 
        font-size: 0.75rem;
    }

    .icon {
        color: #6F6F6F;
        margin: 10px;
    }
    
    @media screen and (min-width: 620px) {
        main {
            display: flex;
            justify-content: space-around;
        }

    }

    @media screen and (min-width: 800px) {
        .icon-container {
            flex-direction: row;
        }

        h1 {
            font-size: 2rem;
        }
        
        input {
            font-size: 1.5rem;
        }

        textarea {
            font-size: 1rem;
        }
    }

</style>