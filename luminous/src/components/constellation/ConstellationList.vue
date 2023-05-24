<template>
  <b-container>
    <carousel-3d ref="mycarousel"
    :autoplay="true" :animationSpeed="1000" :autoplayHoverPause="true" :autoplayTimeout="3000"
    :width="400" :height="300" :controls-visible="false" v-if="constellationList.length !== 0" @before-slide-change="onBeforeSlideChange" >
      <slide class="slide" v-for="(constellation, i) in constellationList" :key="i" :index="i">

        <img :src= "require('@/assets/img/constellation/' + constellation.img)" >

      </slide>
      </carousel-3d>
        <div style="margin-bottom: 20px;">
  <b-button @click="goToSlide(0)">처음으로</b-button>
</div>
      <b-container class="contents" >
    <div v-if="constellationList.length !== 0" :constellation="constellationList[currentItem]" >
  <div class="constellation-info">
    <div class="contents-name" >{{ constellationList[currentItem].contentsName }}</div>
    <b-row>
      <b-col cols="5" class="text-right"><span class="label">학명 : </span>
      </b-col>
      <b-col class="text-left">
        <span class="scientific-name">{{ constellationList[currentItem].scientificName }}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="5"  class="text-right"><span class="label">영어명 : </span>
      </b-col>
      <b-col class="text-left">
        <span class="eng-name">{{ constellationList[currentItem].engName }}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="5"  class="text-right"><span class="label">자오선 : </span>
      </b-col>
      <b-col class="text-left">
    <span class="meridian-date-time">{{ getMeridianDateTime(currentItem) }}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="5"  class="text-right"><span class="label">행성 수 : </span>
      </b-col>
      <b-col class="text-left">
    <span class="amount-of-stars">{{ constellationList[currentItem].amountOfStars }}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="5"  class="text-right"><span class="label">크기 : </span>
      </b-col>
      <b-col class="text-left">
    <span class="size">{{ constellationList[currentItem].size }}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="5"  class="text-right"><span class="label">위치 : </span>
      </b-col>
      <b-col class="text-left">
    <span class="location">{{ constellationList[currentItem].location }}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="5"  class="text-right"><span class="label">특징 : </span>
      </b-col>
      <b-col class="text-left">
        
    <span class="contents-description">{{ constellationList[currentItem].contentsDescription }}</span>
  </b-col>
    </b-row>

    
    
    
  </div>
</div>

    </b-container>
  </b-container>
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
    getMeridianDateTime(currentItem){
      const meridianDateTime = this.constellationList[currentItem].meridianDateTime;
      const date = new Date(meridianDateTime);
      const dt = new Intl.DateTimeFormat('ko-KR', {
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }).format(date);

      

      // 변환된 형식으로 표시
      return dt.replace('.', '월').replace('.', '일');

    },
    onBeforeSlideChange(index) {
      this.currentItem = index;
    },
    goToSlide(index) {
      
      try{
      this.$refs.mycarousel.goSlide(index)
      }catch(error){
        console.log()
      }
    },
    handleScroll(event){
      let len = this.constellationList.length;
      if (event.deltaY > 0) {
        this.currentItem = (len+this.currentItem-1)%len
      this.$nextTick(() => {
        this.$refs.mycarousel.goSlide(this.currentItem);
      });
      }
      else if(event.deltaY < 0){
        this.currentItem = (len+this.currentItem+1)%len
      this.$nextTick(() => {
        this.$refs.mycarousel.goSlide(this.currentItem);
      });

      }
    },
    handleKeyDown(event) {
      let len = this.constellationList.length;
      if (event.key === 'ArrowRight') {
          this.currentItem = (len+this.currentItem+1)%len
      this.$nextTick(() => {
        this.$refs.mycarousel.goSlide(this.currentItem);
      });
      } else if (event.key === 'ArrowLeft') {
          this.currentItem = (len+this.currentItem-1)%len
      this.$nextTick(() => {
        this.$refs.mycarousel.goSlide(this.currentItem);
      });
      }
  
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
  
  filter: drop-shadow(0 1px 0.2rem #555454); 
}
img {
  width: 400px;
  height: 300px;
  object-fit: fill;
}


.constellation-info {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
}

.contents{
  
  align-items: center;
  max-width: 700px;
  min-width: 700px;
}
.contents-name {
  font-weight: bold;
  font-size: 20px;
}

.scientific-name {
  margin-top: 10px;
  font-style: italic;
}

.eng-name {
  margin-top: 5px;
}

.meridian-date-time {
  margin-top: 10px;
  font-size: 14px;
}

.amount-of-stars,
.size,
.location {
  margin-top: 15px;
}

.contents-description {
  margin-top: 20px;
}

.label {
  font-family: Arial, sans-serif;
  font-weight: normal;
  font-style :normal;
}


</style>
