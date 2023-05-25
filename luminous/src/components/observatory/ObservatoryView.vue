<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    
    <div id = "map"></div>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${observatory.id}.
          ${observatory.observatoryName}</h3><div><h6>${observatory.id}</div><div>${observatory.address.split(' ')[0]}</h6></div><div>${observatory.address}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div>{{observatory.homePage}}</div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <div style="padding: 50px;">
    <b-button style="border-radius: 15px ; height: 45px;">
      <router-link :to="{ name: 'observatorylist' }" class="btn text-white">
        목록으로
      </router-link>
    </b-button>
  </div>
  </b-container>
</template>

<script>
// import moment from "moment";
import { getObservatory } from "@/api/observatory";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "ObservatoryView",
  data() {
    return {
      observatory:{
        address: ""

      },
      map:null,
      marker:null,
      isUserid: false,
      geocoder:null,
      latitude:0,
      longitude:0,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    /* global kakao */
    if (!("geolocation" in navigator)) {
      return;
    }
    
    let param = this.$route.params.id;
    getObservatory(
      param,
      ({ data }) => {
        this.observatory = data.result;
        
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
      this.$router.push({ name: "observatorylist" });
    },
    initMap() {
      var map = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng(this.observatory.latitude, this.observatory.longitude),
        level: 3,
      })
      this.map = map
      this.geocoder = new kakao.maps.services.Geocoder();
      this.map.setMaxLevel(15)
      
      //마커이미지 설정
      const markerImageUrl = require('@/assets/img/marker/observatoryMarker.png');
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

<style>#map {
  width: 100%;
  height: 300px;
}</style>
