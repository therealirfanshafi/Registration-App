<template>
    <main>
        <h1 id="title">Sign Up</h1>
        <form class="multi-bg">
            <div class="logical-input-group">
                <label for="full-name">Full Name</label>
                <input type="text" id="full-name">
            </div>
            <div class="same-line">
                <div class="logical-input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email">
                </div>
                <div class="logical-input-group">
                    <label for="phone-number">Phone Number</label>
                    <input type="tel" id="phone-number">
                </div>
            </div>
            <div class="same-line">
                <div class="logical-input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password">
                </div>
                <div class="logical-input-group">
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-passsword">
                </div>
                
            </div>
            <div class="same-line">
                <div class="logical-input-group">
                    <label for="school">School</label>
                    <select id="school">
                        <option value="Sunnydale">Sunnydale</option>
                        <option value="Mastermind">Mastermind</option>
                        <option value="Scholastica">Scholastica</option>
                    </select>
                </div>

                <div class="logical-input-group">
                    <label for="class">Class</label>
                    <select id="class">
                        <option value="VIII">VIII</option>
                        <option value="IX">IX</option>
                        <option value="X">X</option>
                        <option value="XI">XI</option>
                        <option value="XII">XII</option>
                    </select>
                </div>

                <div class="logical-input-group">
                    <label for="date-of-birth">Date of Birth</label>
                    <input type="date" id="date-of-birth">
                </div>
            
            </div>
            <div class="logical-input-group" style="align-items: center;">
                <p>Will you avail bus?</p>
                <div id="bus-avail-container">
                    <div class="radio-options">
                        <label for="yes">Yes</label>
                        <input type="radio" id="yes" value="Yes" name="bus">
                    </div>
                    <div class="radio-options">
                        <label for="no">No</label>
                        <input type="radio" id="no" value="No" name="bus">
                    </div>
                </div>
            </div>
            
        </form>
    </main>
   

    
</template>

<style scoped>

main {
    color: white;
}

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