<template>
    <div class="d-flex justify-content-center">
      <div class="main-container ">


        <div id="slider-container" style="border-radius: 33px; overflow: hidden;">
          <vueper-slides id="slider" :parallax-fixed-content="true" fixed-height="400px" transition-speed="250" :dragging-distance="70" prevent-y-scroll>
            <vueper-slide
              class="vueper-slide"
              v-for="(slide, i) in slides"
              :key="i"
              :title="slide.title"
              :content="slide.content"
              :image="slide.image"
              :style="{ color: 'white'}"
              @click.native="navigateToLink(slide.link)"
              style="cursor: pointer;">
            </vueper-slide>
          </vueper-slides>
        </div>

        <div id="box-container">
          <router-link :to="{ name: 'observatorylist' }" class="link newcolor box">
            <b-icon icon="moon"></b-icon>
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

        <h4 class="text-left">오늘 나의 운세</h4>

        <div id="forfune-container">
          <div id="fortune-area">
            <div v-if="userInfo" id="image-area" class="col-lg-3 text-left">
              
              <img class="fortune-image" :src="require('@/assets/img/constellation12/'+`${userInfo.constellation12Img}`)" height="100%">
            </div>
            <div v-else id="image-area" class="col-lg-3 text-left">
              <img class="fortune-image" :src="require('@/assets/img/constellation12/mosaic.png')" height="100%">
            </div>
            <div id="desc-area" class="col-lg-8 text-left mt-5">
              <router-link v-if="userInfo" :to="{ name: 'fortunelist' }" class="fortune-link">
                <h4>{{userInfo.constellation12Name}}</h4>
                {{fortuneList[userInfo.constellation12Id-1].description}}
              
              </router-link>
              <div v-else>
                <router-link :to="{ name: 'fortunelist' }" class="request-login">
                  오늘의 운세 보러가기
                </router-link>
                <div class="mosaic" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
                  <h4>물병자리</h4>
                  <p>계획한 대로 잘 이루어질 거에요. 함께 힘을 모아 꿈꾸는 것도 좋아요.</p>
                </div>
              </div>
            </div>  
          </div>
        </div>

      </div>


    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { VueperSlides, VueperSlide } from 'vueperslides'
import { listFortune } from "@/api/fortune";
import 'vueperslides/dist/vueperslides.css'

const memberStore = "memberStore";

export default {
  name: "MainApp",
  data() {
    return {
      fortuneList: [],
      observatoryTitle : "천문대",
      slides: [
        {
          title: '천문대',
          content: '주변에 있는 천문대에서 별을 확인해 보십니다.',
          // image: 'https://cdn.greenpostkorea.co.kr/news/photo/201902/101192_98257_4138.jpg',
          image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FudBi1%2FbtqDTjGXEpp%2FNgyg3Mjks6TNIKvK8kTLa0%2Fimg.jpg',
          link: 'observatory'
        },
        {
          title: '캠핑장',
          content: '주변에 있는 캠핑장에서 별을 확인해 보십니다.',
          image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FHGbDX%2FbtqDQsMl4sX%2F5VBg3bWpbpFPP45pEM7PFK%2Fimg.jpg',
          link: 'camping'
        },
        {
          title: '핫플레이스',
          content: '주변에 있는 핫플레이스에서 별을 확인해 보십니다.',
          image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcsSocF%2FbtqDQsZR4ob%2FKB5Ml8D9B1gAAJAX6q2xsk%2Fimg.jpg',
          link: 'place'
        }
      ]
    }
  },
  components: { VueperSlides, VueperSlide },
  created() {
    listFortune(
      ({data})=>{
        this.fortuneList = data.result;
        console.log(this.fortuneList)
      },
      (error)=>{
        console.log(error);
      }
    );
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    navigateToLink(link) {
      console.log(link);
      // Vue Router를 사용하여 해당 링크로 이동
      this.$router.push(link);
    }
  },
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.main-container {
  width: 1110px;
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
  color: white; 
  width: 200px;
  height: 100px;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;

  border-radius: 10px;
  background-color: #343A40;
  border: 3px solid #343A40;

  /* box-shadow: rgba(0, 0, 0, 0.69) 0px 26px 30px -10px, rgba(0, 0, 0, 0.73) 0px 16px 10px -10px; */
  box-shadow: 0px 20px 20px -10px rgb(53, 53, 53);

  transition: transform 0.3s ease-in-out;
}

.box:hover {
  transform: scale(1.15) !important;
  border: 3px solid rgb(100, 100, 100);
  color: white;
  background-image: url(https://cdn.pixabay.com/photo/2021/04/14/20/34/night-sky-6179468_1280.jpg);
  background-size: 100%;

}

.box:not(:hover) {
  transform: scale(1);
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

.vueperslide__content-wrapper:not(.vueperslide__content-wrapper--outside-top):not(.vueperslide__content-wrapper--outside-bottom) {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: flex-end;
}


.underline-steelblue {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
}

.vueper-slide {
  background-position-y: bottom;
}

.link:hover {
  text-decoration: none;
}

/* 운세 시작 */

#forfune-container {
  margin: 20px 0px;
  width: 100%;
  height: 250px;
  

  border-radius: 10px;
  background-color: #343A40;
  border: 3px solid #343A40;

  /* box-shadow: rgba(0, 0, 0, 0.69) 0px 26px 30px -10px, rgba(0, 0, 0, 0.73) 0px 16px 10px -10px; */
  box-shadow: 0px 20px 20px -10px rgb(53, 53, 53);
}

.mosaic {
  width: 100%;
  height: 100%;
  position: absolute;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px); /* Chrome 브라우저에서 필요한 접두사 */
  background-color: transparent; /* 배경을 투명하게 설정 */
  z-index: 1;
}

#fortune-area {
  color: white;
  height: 100%;

  display: flex;
  flex-direction: row;
}

.image-area {
  padding: 0px;
}

.fortune-image {
  color: white;
  text-shadow: 0px 0px 10px white;
  /* color: transparent; */
}

.mosaic {
  /* color: white; */
  text-shadow: 0px 0px 10px white;
  color: transparent;
}

.request-login {
  z-index: 1;
}

.request-login {
  width: 200px;
  height: 80px;
  color: black;

  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;

  border-radius: 20px;
  border: 0px;

  position: absolute;
  left: 200px;
  top: 40px;

  transition: transform 0.3s ease-in-out; 
  z-index: 2;
}

.request-login:hover {
  transform: scale(1.15) !important;
}

.request-login:not(:hover) {
  transform: scale(1);
}

.fortune-link {
  color: white;

  text-decoration: none;
}


/* 운세 끝 */


</style>
