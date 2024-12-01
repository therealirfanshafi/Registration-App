<template>
  <main class="footer-main">
    <div id="contact-us">
      <h1>Contact us at:</h1>
      <h2>sdmathxtechclub@gmail.com</h2>
    </div>
    <div id="our-socials">
      <h1>MathxTech Club Socials</h1>
      <div class="icon-container">
        <a
          href="https://www.instagram.com/sdmathxtech?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          ><font-awesome-icon class="icon" icon="fa-brands fa-instagram" size="6x"
        /></a>
        <a
          href="https://www.facebook.com/people/Sunnydale-Math-X-Tech-Club/100088497041602/?mibextid=ZbWKwL"
          ><font-awesome-icon class="icon" icon="fa-brands fa-facebook" size="6x"
        /></a>
      </div>
    </div>
    <div id="developer-socials">
      <h1>Robotics Club Socials</h1>
      <div class="icon-container">
        <a
          href="https://www.instagram.com/sd_robotics?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          ><font-awesome-icon class="icon" icon="fa-brands fa-instagram" size="6x"
        /></a>
        <a href="https://www.facebook.com/profile.php?id=61564962033432"
          ><font-awesome-icon class="icon" icon="fa-brands fa-facebook" size="6x"
        /></a>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.footer-main {
  background-color: #1b1a1a;
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  padding-top: 60px;
  padding-bottom: 60px;
}

h1 {
  font-size: 1.5rem;
  text-align: center;
}

#contact-us {
  margin: 20px;
}

#contact-us,
#our-socials,
#developer-socials {
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

input,
textarea {
  margin: 5px;
  padding: 5px;
  background-color: #d9d9d9;
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
  color: #6f6f6f;
  margin: 10px;
}

@media screen and (min-width: 620px) {
  .footer-main {
    display: flex;
    flex-direction: row;
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
