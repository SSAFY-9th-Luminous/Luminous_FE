<template>
    <div class="d-flex justify-content-center">
      <div class="main-container ">


        <div id="slider-container">
          <vueper-slides id="slider" :parallax-fixed-content="true" fixed-height="400px" arrows-outside transition-speed="250" :dragging-distance="70" prevent-y-scroll>
            <vueper-slide
              class="vueper-slide"
              v-for="(slide, i) in slides"
              :key="i"
              :title="slide.title"
              :content="slide.content"
              :image="slide.image"
              :style="`color:white`">
              <!-- <template #content>
                <router-link class="height:100%" :to="{ name: 'observatorylist'}">gold</router-link>
              </template> -->
            </vueper-slide>
          </vueper-slides>
        </div>

        <div id="box-container" class="">
          <router-link :to="{ name: 'observatorylist' }" class="link newcolor box">
            <b-icon icon="moon" ></b-icon>
              <p>천문대</p>
          </router-link>
          <router-link :to="{ name: 'campinglist' }" class="link newcolor box">
              <b-icon icon="tree" ></b-icon>
              <p>캠핑장</p>
          </router-link>
          <router-link :to="{ name: 'constellationlist' }" class="link newcolor box">
            <b-icon icon="star" ></b-icon>
              <p>별자리</p>
          </router-link>
          <router-link :to="{ name: 'map' }" class="link newcolor box">
            <b-icon icon="map" ></b-icon>
              <p>지도</p>
          </router-link>
          <router-link :to="{ name: 'placelist' }" class="link newcolor box">
            <b-icon icon="people" ></b-icon>
              <p>핫플레이스</p>
          </router-link>
        </div>

      </div>


    </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: "MainApp",
  data() {
    return {
      // observatoryRouterLink: observatorylist,
      // campingRouterLink: campinglist,
      // plcaeRouterLink: placelist
      observatoryTitle : "천문대",
      slides: [
        {
          title: '천문대',
          content: '주변에 있는 천문대에서 별을 확인해 보십니다.',
          image: 'https://cdn.greenpostkorea.co.kr/news/photo/201902/101192_98257_4138.jpg'
        },
        {
          title: '캠핑장',
          content: '주변에 있는 캠핑장에서 별을 확인해 보십니다.',
          image: 'https://www.sjsori.com/news/photo/201909/39553_46783_517.jpg'
        },
        {
          title: '핫플레이스',
          content: '주변에 있는 핫플레이스에서 별을 확인해 보십니다.',
          image: ''
        }
      ]
    }
  },
  components: { VueperSlides, VueperSlide },
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.main-container {
  width: 1550px;
}

#slider-container {
  /* box-shadow :rgba(0, 0, 0, 0.69) 0px 26px 30px -10px, rgba(0, 0, 0, 0.73) 0px 16px 10px -10px */
    
  /* box-shadow: 10px 30px 50px 5px rgb(53, 53, 53); */

    box-shadow: 0px 50px 50px -5px rgb(53, 53, 53);
}

#box-container {
  margin: 50px 0px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

p{
  padding-left: 5px;
  margin: 0px;
  line-height: 25px;
}

.box {
  font-size: 25px;
  color: #a9a9a9; 
  width: 250px;
  height: 130px;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;

  border-radius: 20px;
  background-color: #ededed;
  border: 3px solid #a9a9a9;

  /* box-shadow: rgba(0, 0, 0, 0.69) 0px 26px 30px -10px, rgba(0, 0, 0, 0.73) 0px 16px 10px -10px; */
  box-shadow: 0px 20px 20px -10px rgb(53, 53, 53);
}

.content {
  display: flex;
  flex-direction: row;
  align-content: center;
}

/* vueper slide 시작 */
.bord {
  height: 2px;
  width: 100%;
  background-color: rgb(143 143 143);
  margin-top: 20px;
  margin-bottom: 20px;
}

.vueperslide__title{
  font-size: 3em; 
  color: white; 
  text-align:left;
  background-color:#64646483;
}

.vueperslides__parallax-wrapper{
  border-radius: 18px;
}

/*이미지 부분 */
.vueperslide vueper-slide vueperslide--active vueperslide--visible {
  background-size: 100px;
  /* background-position-x: 50px; */
  background-position-y: -4px;
}
.vueperslide__content-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.vueperslide__content-wrapper:not(.vueperslide__content-wrapper--outside-top):not(.vueperslide__content-wrapper--outside-bottom){
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
}


</style>
