<template>
  <footer>
    <div class="footer-content">
      <b-container>
        <div class="footer-container">
          <img class="logo" :src="require(`@/assets/img/luminous.png/`)" height="100%">
          <div class="developers mt-4">
            <div class="title">
              <p class="mr-4">developer</p>
            </div>
            <div class="developer ">
              <p class="mr-2">이준혁</p>
              <p class="mr-2">채희찬</p>
              <p class="mr-2">태준모</p>
            </div>
            
          </div>

          <div class="developers">
            <div class="developer">
              <p>Copyright 2023. LUMINOUS all rights reserved.</p>
            </div>
            
          </div>
        </div>
      </b-container>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style>
footer {
  color: white;
  background-color: #343A40;
  padding: 20px;
  text-align: center;
}

.logo {
  height : 50px;
  width: 120px;
}

.developers {
  display: flex;
  flex-direction: row;
}

.title p {
  font-size: 1.1rem;
}

.developer {
  display: flex;
  flex-direction: row;
}

.developer p {
  font-size: 1.05rem;
}


.footer-content {
  max-width: 960px;

  margin: 0 auto;
}

.footer-container {
  display: flex;
  flex-direction: column;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin-right: 10px;
}

a {
  text-decoration: none;
  color: #333;
}
</style>