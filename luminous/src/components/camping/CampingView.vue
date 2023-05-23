<template>
  <b-container class="bv-example-row mt-3">
    
    <b-row>
      <b-col>
        <h3 class="text-left">{{camping.campingName}}</h3>
      </b-col>
    </b-row>
    
    <div class="mt-5 md-5">
      <vueper-slides id="slider">
        <vueper-slide
          v-for="(image, i) in images"
          :key="i"
          :image="image.imageUri">
        </vueper-slide>
      </vueper-slides>
    </div>

    <b-row class="mt-5 mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${camping.id}.
          ${camping.campingName}</h3><div><h6>${camping.id}</div><div>${camping.doName}</h6></div><div>${camping.address}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div>{{camping.homePage}}</div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

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


#map {
  width: 100%;
  height: 300px;
}

#slider {
  
}

</style>
