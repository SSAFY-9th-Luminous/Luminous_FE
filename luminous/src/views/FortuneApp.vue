<template>
  
    <b-container class="bv-example-row mt-3 text-center">
      <h3 class="underline-steelblue"><b-icon icon="star"></b-icon> 오늘의 운세</h3>
      <router-view></router-view>
    </b-container>
  </template>
  
  <script>
  
  export default {
      name: "FortuneApp",
      components(){
      },
  };
  </script>
  
  <style scoped>
  .underline-steelblue {
    display: inline-block;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
  }
  </style>
  