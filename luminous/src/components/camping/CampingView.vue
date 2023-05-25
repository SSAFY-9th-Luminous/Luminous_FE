<template>
  <b-container class="bv-example-row mt-3 font">

    <div id="br" class="mb-5"></div>
    <!-- title & locationInfo -->
    <div id="top-container">
      <div id="top-left">
        <div id="title-area">
          <h3 v-if="camping.campingName" id="title" class="text-left mb-3 mr-3">{{camping.campingName}}</h3>
          <h3 v-else class="text-left">캠핑장</h3>

          <p v-if="camping.lineIntro" class="text-left">{{camping.lineIntro}}</p>
          <p v-else class="text-left">맑은 공기 속에서 밤하늘의 별을 보며 잠들 수 있는 캠핑장</p>
        </div>

        <div id="location-area" class="text-left mb-3">

          <img class="image" :src= "require('@/assets/img/camping/location.png')" >
          <a class="link" :href="`https://www.google.com/maps/place/${camping.address.replace(' ', '+')}`" target="_blank">{{camping.address}}</a>
        </div>
        
      </div>
      <div id="top-right">
        <div id="rate-area">
          <div class="rate-show-area">
            <div class="star-ratings">
              <div 
                id="stars"
                class="star-ratings-fill space-x-2 text-lg"
                :style="{ width: ratingToPercent + '%' }"
              >
                <span>★&nbsp;</span><span>★&nbsp;</span><span>★&nbsp;</span><span>★&nbsp;</span><span>★</span>
              </div>
              <div class="star-ratings-base space-x-2 text-lg">
                <span>★&nbsp;</span><span>★&nbsp;</span><span>★&nbsp;</span><span>★&nbsp;</span><span>★</span>
              </div>
            </div>
          </div>

          <div id="rate-stars-container" class="mt-3">
            <div id="rate" :style="{ display: showRate ? 'block' : 'none' }">
              <div class="star-rating space-x-4 mx-auto">
                <input type="radio" id="5-stars" name="rating" value="5" v-model="ratings"/>
                <label for="5-stars" class="star pr-4">★</label>
                <input type="radio" id="4-stars" name="rating" value="4" v-model="ratings"/>
                <label for="4-stars" class="star">★</label>
                <input type="radio" id="3-stars" name="rating" value="3" v-model="ratings"/>
                <label for="3-stars" class="star">★</label>
                <input type="radio" id="2-stars" name="rating" value="2" v-model="ratings"/>
                <label for="2-stars" class="star">★</label>
                <input type="radio" id="1-star" name="rating" value="1" v-model="ratings" />
                <label for="1-star" class="star">★</label>
              </div>
            </div>
            <div id="rate-button" class="rate-button-area mt-1" :style="{ display: showButton ? 'none' : 'block' }">
              <button class="rate-button" @click="rate">평점 주기</button>
            </div>
            <div id="submit-rate" class="rate-button-area mt-1" :style="{ display: showRate ? 'block' : 'none' }">
              <button class="rate-button button-color" @click="submitRate">평점 제출</button>
            </div>
          </div>
          

        </div>
      </div>
    </div>

    <!-- intro -->
    <b-row>
      <b-col>
        
      </b-col>
    </b-row>
    
    <div id="slider-container">
      <vueper-slides id="slider">
        <vueper-slide
          class="vueper-slide"
          v-for="(image, i) in images"
          :key="i"
          :image="image.imageUri">
        </vueper-slide>
      </vueper-slides>
    </div>

    <div id="content-main-container">
      <div class="content-area">
        <div class="content-title-area col-lg-2">
          <h5 class="text-left">기본 정보</h5>
        </div>
        <div class="content-left-area col-lg-9">

          <div class="content-detail">
            <div class="content-sub-title"><h6>위치</h6></div>
            <div v-if="camping.address" class="content col-lg-10">{{camping.address}}</div>
            <div v-else class="content col-lg-10"> - </div>
          </div>

          <div class="content-detail">
            <div class="content-sub-title"><h6>홈페이지</h6></div>
            <div v-if="camping.homepage" class="content col-lg-10"><a class="link" :href="camping.homepage" target="_blank">{{camping.homepage}}</a></div>
            <div v-else class="content col-lg-10"> - </div>
          </div>

          <div class="content-detail">
            <div class="content-sub-title"><h6>전화번호</h6></div>
            <div v-if="camping.tel" class="content col-lg-10">{{camping.tel}}</div>
            <div v-else class="content col-lg-10"> - </div>
          </div>
          

        </div>

      </div>

      <div class="border"></div>

      <div class="content-area">
        <div class="content-title-area col-lg-2">
          <h5 class="text-left">캠핑장 옵션</h5>
        </div>
        <div class="content-left-area col-lg-9">

          <div class="content-detail">
            <div class="content-sub-title"><h6>캠핑장 테마</h6></div>
            <div v-if="camping.theme" class="content col-lg-10">{{camping.theme}}</div>
            <div v-else class="content col-lg-10"> - </div>
          </div>

          <div class="content-detail">
            <div class="content-sub-title"><h6>글램핑 옵션</h6></div>
            <div v-if="camping.glamping" class="content col-lg-10">{{camping.glamping}}</div>
            <div v-else class="content col-lg-10"> - </div>
          </div>

          <div class="content-detail">
            <div class="content-sub-title"><h6>카라반 옵션</h6></div>
            <div v-if="camping.caravan" class="content col-lg-10">{{camping.caravan}}</div>
            <div v-else class="content col-lg-10"> - </div>
          </div>

          <div class="content-detail">
            <div class="content-sub-title"><h6>주변 편의시설</h6></div>
            <div v-if="camping.facility" class="content col-lg-10">{{camping.facility}}</div>
            <div v-else class="content col-lg-10"> - </div>
          </div>


        </div>
      </div>
    </div>


    <div class="border"></div>

    <div class="content-area">

      <div class="content-title-area col-lg-2">
          <h5 class="text-left"><h5>상세 설명</h5></h5>
        </div>
        
        <div class="content-left-area col-lg-9">
          <div class="content-detail">
            <div v-if="camping.intro" class="content text-left">{{camping.intro}}</div>
            <div v-else class="content col-lg-10"> - </div>
          </div>
        </div>
    </div>

    <div class="border"></div>


    <div class="content-area">
      <div class="content-title-area col-lg-2">
        <h5 class="text-left">지도</h5>
      </div>
      <div class="content-title-area col-lg-9">
      </div>
    </div>

    <div class="mt-4 mb-5 pd-5">
      <div id = "map"></div>
    </div>

    

    <div style="padding: 50px;">
      <b-button style="border-radius: 15px ; height: 45px;">
        <router-link :to="{ name: 'campinglist' }" class="btn text-white">
          목록으로
        </router-link>
      </b-button>
    </div>

  </b-container>
</template>

<script>
// import moment from "moment";
import { getCamping, submitRate } from "@/api/camping";
import { mapState } from "vuex";
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

const memberStore = "memberStore";

export default {
  name: "CampingView",
  data() {
    return {
      slides: [
      ],
      camping:{
        address:""
      },
      images: {

      },
      showRate : false,
      showButton: false,
      ratings:0,
      map:null,
      marker:null,
      isUserid: false,
      geocoder:null,
      latitude:0,
      longitude:0,
    };
  },
  components: { VueperSlides, VueperSlide },

  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ratingToPercent() {
      const score = +this.ratings * 20;
      return score + 1.5;
    },
  },
  created() {
    /* global kakao */
    if (!("geolocation" in navigator)) {
      return;
    }
    
    let param = this.$route.params.id;
    getCamping(
      param,
      ({ data }) => {
        this.camping = data.result.camping;
        this.images = data.result.campingImageList;
        this.ratings = data.result.camping.rate;

        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&libraries=services&autoload=false";
        document.head.appendChild(script);
      },
      (error) => {
        console.log(error);
      }
    );
    this.isUserid = true;
  
  },
  methods: {
    moveList() {
      this.$router.push({ name: "campinglist" });
    },
    rate() {
      this.showRate = !this.showRate;
      this.showButton = !this.showButton;
    },
    submitRate() {
      this.rate();

      let param = {
        id: this.camping.id,
        rate: this.ratings,
      };
      
      submitRate(
        param,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";

          if (data.isSuccess === true) {
            msg = "등록이 완료되었습니다.";
            this.ratings = data.result.rate;

          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    initMap() {
      var map = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng(this.camping.latitude, this.camping.longitude),
        level: 3,
      })
      this.map = map
      this.geocoder = new kakao.maps.services.Geocoder();
      this.map.setMaxLevel(15)
      
      //마커이미지 설정
      const markerImageUrl = require('@/assets/img/marker/campingMarker.png');
      const markerSize = new kakao.maps.Size(60, 60);
      const markerOptions = {
        offset: new kakao.maps.Point(30, 60) // Offset the marker image
      };
            
      // 마커이미지와 마커를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerSize, markerOptions)
      var marker = new kakao.maps.Marker({ 
                // 지도 중심좌표에 마커를 생성합니다 
                position: map.getCenter(),
                image: markerImage
      }); 
      // 지도에 마커를 표시합니다
      marker.setMap(this.map);
    }
  },
};
</script>

<style>

.image {
  width: 25px;
  height: 25px;
}
.font{
  font-family: AppleSDGothicNeoR;
}
#top-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#title-area {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#rate-area{
  display: flex;
  flex-direction: column;
}

#rate {
  display: none;
}

#content-main-container {
  margin-top: 50px;
  margin-bottom: 50px;
  display: felx;
  flex-direction: column;
}

#slider-container {
  border-radius: 10px;
}

.vueperslides__parallax-wrapper{
  background-color: white;
    border-radius: 18px;

}

.content-area {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.content-left-area {
  display: flex;
  flex-direction: column;
}

.content-detail {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 25px;
}

.tel {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.content-sub-title {
  display: flex;
  flex-direction: row;
}

.border {
  height: 1px;
  width: 100%;
  background-color: rgb(29, 29, 29);
  margin-top: 20px;
  margin-bottom: 20px;
}

.link {
  color: black;
  text-decoration: underline;
}

.link:hover {
  color: rgb(129, 129, 129);
}

#br {
  height: 1px;
  width: 100%;
  background-color: rgb(197, 135, 20);
}

#map {
  width: 100%;
  height: 500px;
  margin-bottom: 50px;
  border-radius: 18px;
}

/* 별점 */

#rate-stars-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.star {
  margin : 0px;
}

.rate-show-area {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.star-ratings {
  color: #aaa9a9; 
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: #2b2a29;
}
 
.star-ratings-fill {
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: gold;
}
 
.star-ratings-base {
  z-index: 0;
  padding: 0;
}


.star-rating {
  display: flex;
  flex-direction: row-reverse;
  font-size: 1.5rem;
  line-height: 2.5rem;
  justify-content: space-around;
  padding: 0 0.2em;
  text-align: center;
  width: 5em;
}
 
.star-rating input {
  display: none;
}
 
.star-rating label {
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 2.3px;
  -webkit-text-stroke-color: #2b2a29;
  cursor: pointer;
}
 
.star-rating :checked ~ label {
  -webkit-text-fill-color: gold;
}
 
.star-rating label:hover,
.star-rating label:hover ~ label {
  -webkit-text-fill-color: #fff58c;
}

.rate-button {
  height: 30px;
  width: 85px;
  background-color: white;
  color: black;
  border-radius: 5px;
  text-decoration: none;
}

.rate-button-area {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#submit-rate {
  display: none;
}

.button-color {
  background-color: bisque;
}

</style>
