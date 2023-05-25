<template>
  <div class="d-flex justify-content-center">
    <div class="main-container ">

    <h3 class="text-left">현재위치 근처 천문대</h3>


      <div id="slider-container">
        <vueper-slides id="slider">
          <vueper-slide
            class="vueper-slide"
            v-for="(slide, i) in slides"
            :key="i"
            :title="slide.title"
            :content="slide.content"
            :image="slide.image">
            <!-- <template #content>
              <i class="icon icon-check"></i>
              <router-link :to="{ name: 'observatorylist'}"></router-link>
            </template> -->
          </vueper-slide>
        </vueper-slides>
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
      slides: [
        {
          title: '천문대',
          content: '주변에 있는 천문대에서 별을 확인해 보십니다.',
          image: 'http://www.apollostar.kr/imgs/img_facility1.jpg'
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
  width: 1500px;
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
  background-size: 1415px;
  /* background-position-x: 50px; */
  background-position-y: -4px;
}

.vueperslide__content-wrapper:not(.vueperslide__content-wrapper--outside-top):not(.vueperslide__content-wrapper--outside-bottom) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  background-color:black;
}

.underline-steelblue {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
}


</style>
