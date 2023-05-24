<template>
  <div class="container">
    <button @click="goToSlide(0)">처음으로</button>
    <carousel-3d ref="mycarousel"
    :autoplay="true" :animationSpeed="1000" :autoplayHoverPause="true" :autoplayTimeout="3000"
    :width="300" :height="300" :controls-visible="false" v-if="constellationList.length !== 0" @before-slide-change="onBeforeSlideChange" >
      <slide class="slide" v-for="(constellation, i) in constellationList" :key="i" :index="i">
        <span class="title text-center"> 
        {{ constellation.contentsName }}

        <img :src= "require('@/assets/img/constellation/' + constellation.img)" >

      </span>

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
      key : 0,
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
  mounted() {
    window.addEventListener('wheel', this.handleScroll);
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    onBeforeSlideChange(index) {
      this.currentItem = index;
    },
    goToSlide(index) {
      this.$refs.mycarousel.goSlide(index)
    },
    handleScroll(event){
      let len = this.constellationList.length;
      if (event.deltaY > 0) {
        this.currentItem = (len+this.currentItem-1)%len
      }
      else if(event.deltaY < 0){
        this.currentItem = (len+this.currentItem+1)%len

      }
      this.$nextTick(() => {
        this.$refs.mycarousel.goSlide(this.currentItem);
      });
    },
    handleKeyDown(event) {
      let len = this.constellationList.length;
      if (event.key === 'ArrowRight') {
          this.currentItem = (len+this.currentItem+1)%len
      } else if (event.key === 'ArrowLeft') {
          this.currentItem = (len+this.currentItem-1)%len
      }
      this.$nextTick(() => {
        this.$refs.mycarousel.goSlide(this.currentItem);
      });
  
    }
  }
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
