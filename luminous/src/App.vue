<template>
  <div id="app">
      <the-header-navbar></the-header-navbar>
      <router-view></router-view>
      <scroll-to-top></scroll-to-top>
  </div>
</template>
<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar";
import ScrollToTop from "./components/ScrollToTop.vue";

export default {
  name: "App",
  components: {
    TheHeaderNavbar,
    ScrollToTop
  },
  
};
</script>
<style>
#app {
  font-family: GmarketSans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3050;
  /* background-color:rgb(12, 10, 31); */
}


*{
  font-weight : 100;
}

a.router-link{
  color:aliceblue;
}

a.router-link:hover {
  font-weight : 800;
}


a.router-link-exact-active {
  color: #efe589;
  font-weight : 100;
}

a.router-link-exact-active:hover {
  /* text-decoration: none; */
  animation : none;
  color: #efe589;
  font-weight : 800;
}

@font-face { 
  font-family: "GmarketSans";
  src: url("@/assets/font/GmarketSansTTFMedium.ttf") format("truetype");
  font-weight: 500;
} 

@font-face { 
  font-family: "GmarketSans";
  src: url("@/assets/font/GmarketSansTTFLight.ttf") format("truetype");
  font-weight: 100;
} 

@font-face { 
  font-family: "GmarketSans";
  src: url("@/assets/font/GmarketSansTTFBold.ttf") format("truetype");
  font-weight: 800;
} 

@font-face { 
  font-family: "AppleSDGothicNeoR";
  src: url("@/assets/font/AppleSDGothicNeoR.ttf") format("truetype");
  font-weight: 800;
} 
</style>