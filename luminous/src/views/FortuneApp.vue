<template>
  <b-container class="bv-example-row mt-3 text-center font">
    <h3 class="underline-steelblue"><b-icon icon="moon"></b-icon> 오늘의 운세</h3>
    <router-view></router-view>
  </b-container>
</template>
  
<script>

export default {
  name: "FortuneApp",
};
</script>
  
<style scoped>
.underline-steelblue {
  font-family: GmarketSans;
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(230, 240, 87, 0.527) 30%);
}

.font {
  font-family: AppleSDGothicNeoR;
}
</style>
  