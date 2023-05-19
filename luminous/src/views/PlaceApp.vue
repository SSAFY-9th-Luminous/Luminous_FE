<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-hotpink"><b-icon icon="clipboard"></b-icon> 마이플레이스 게시판</h3>
    <router-view></router-view>
  </b-container>
</template>
<script>
export default {
  name: "PlaceApp",
};
</script>
<style scoped>
.underline-hotpink {
  display: inline-block;
  background: linear-gradient(180deg, rgba(230, 222, 222, 0) 70%, rgba(231, 27, 139, 0.3) 30%);
}

.container{
  width: 75%
}
</style>
