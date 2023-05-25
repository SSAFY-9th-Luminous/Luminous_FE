<template> 


<b-container class="bv-example-row mt-3 text-center font">
      <h3><b-icon icon="tree"></b-icon> 캠핑장 </h3>
      <router-view></router-view>
    </b-container>
</template>

<script>
export default {
    
  name: "CampingApp",
  data() {
    return {
      title: "camping"
    }
  },
};
</script>

<style scoped>

.underline-steelblue {
  font-family: GmarketSans;
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
}
.font{
  font-family: AppleSDGothicNeoR;
}
</style>