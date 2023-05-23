<template>
  <div class="container">
    <carousel-3d :width="300" :height="300" v-if="constellationList.length !== 0" @before-slide-change="onBeforeSlideChange">
      <slide class="slide" v-for="(constellation, i) in constellationList" :key="i" :index="i">
        <span class="title text-center"> 
        {{ constellation.contentsName }}</span>

        <img :src= "require('@/assets/img/constellation/' + constellation.img)" >

      </slide>
      </carousel-3d>
    <div v-if="constellationList.length !== 0" :constellation="constellationList[currentItem]">

      <div>
        {{ constellationList[currentItem].scientificName }}
      </div>
        {{ constellationList[currentItem].engName }}
        <div>
        {{ constellationList[currentItem].meridianDateTime }}
      </div>
      <div>
        {{ constellationList[currentItem].amountOfStars }}
      </div>
      <div>
        {{ constellationList[currentItem].size }}
      </div>
      <div>
        {{ constellationList[currentItem].location }}
      </div>
      <div>
        {{ constellationList[currentItem].contentsDescription }}
      </div>
    </div>
  </div>
</template>

<script>
import { listConstellation } from "@/api/constellation";
import {Carousel3d,Slide} from "vue-carousel-3d";


export default {
  name: 'ConstellationList',
  components: {
    Carousel3d,
    Slide
  },
  data() {
    return {
      currentItem: 0,    
      constellationList: [],
      constellation : null,
    };
  },
  created() {
    listConstellation(
      ({ data }) => {
        this.constellationList = data.result;
        console.log(this.constellationList);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    onBeforeSlideChange(index) {
      this.currentItem = index;
    },
  },
};
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  
}
.title{
  font-size: 40px;
}

.slide {
  border-radius: 10px;
}
</style>
