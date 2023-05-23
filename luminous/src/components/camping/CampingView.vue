<template>
  <b-container class="bv-example-row mt-3">

    <div id="br" class="mb-5"></div>

    <!-- title -->
    <b-row>
      <b-col>
        <h3 v-if="camping.campingName" class="text-left mb-3">{{camping.campingName}}</h3>
        <h3 v-else class="text-left mb-3">캠핑장</h3>
      </b-col>
    </b-row>

    <!-- intro -->
    <b-row>
      <b-col>
        <p v-if="camping.lineIntro" class="text-left">{{camping.lineIntro}}</p>
        <p v-else class="text-left">맑은 공기 속에서 밤하늘의 별을 보며 잠들 수 있는 캠핑장</p>
      </b-col>
    </b-row>
    
    <div class=" md-5">
      <vueper-slides id="slider">
        <vueper-slide
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
            <div v-if="camping.homepage" class="content col-lg-10">{{camping.homepage}}</div>
            <div v-else class="content col-lg-10"> - </div>
          </div>

          <div class="content-detail">
            <div class="content-sub-title"><h6>전화번호</h6></div>
            <div v-if="camping.tel" class="content col-lg-10">{{camping.tel}}</div>
            <div v-else class="content col-lg-10"> - </div>
          </div>
          
          <div class="content-detail">
            <div class="content-sub-title"><h6>상세 설명</h6></div>
            <div v-if="camping.intro" class="content col-lg-10">{{camping.intro}}</div>
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
            <div class="content-sub-title"><h6>글램핑 정보</h6></div>
            <div v-if="camping.glamping" class="content col-lg-10">{{camping.glamping}}</div>
            <div v-else class="content col-lg-10"> - </div>
          </div>

          <div class="content-detail">
            <div class="content-sub-title"><h6>카라반 정보</h6></div>
            <div v-if="camping.caravan" calss="content col-lg-10">{{camping.caravan}}</div>
            <div v-else class="content col-lg-10"> - </div>
          </div>



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

    <div class="md-5 pd-5">
      <div id = "map"></div>
    </div>

    


  </b-container>
</template>

<script>
// import moment from "moment";
import { getCamping } from "@/api/camping";
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

      },
      images: {

      },
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
        console.log(this.images)
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
#content-main-container {
  margin-top: 50px;
  margin-bottom: 50px;
  display: felx;
  flex-direction: column;
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
  margin-bottom: 10px;
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

#br {
  height: 1px;
  width: 100%;
  background-color: rgb(197, 135, 20);
}

#map {
  width: 100%;
  height: 300px;
  margin-bottom: 50px;
}

#slider {
  
}

</style>
