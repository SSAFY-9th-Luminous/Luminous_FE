<template>
  <b-container class="bv-example-row mt-3 text-center font">
    <h3><b-icon icon="clipboard"></b-icon> 게시판</h3>
    <router-view></router-view>
  </b-container>
</template>
<script>
export default {
  name: "BoardApp",
};
</script>
<style scoped>
.underline-hotpink {
  font-family: GmarketSans;
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(231, 27, 139, 0.3) 30%);
}
.font{
  font-family: AppleSDGothicNeoR;
}
</style>
