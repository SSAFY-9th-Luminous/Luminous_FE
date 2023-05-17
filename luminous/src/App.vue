<template>
  <div id="app">
      <the-header-navbar></the-header-navbar>
      <router-view></router-view>
  </div>
</template>
<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar";

export default {
  name: "App",
  components: {
    TheHeaderNavbar
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3450;
}

a.router-link-exact-active {
  color: #efe589;
  
}

a.router-link-exact-active:hover {
  /* text-decoration: none; */
  animation : none;
  color: #efe589;
}
</style>