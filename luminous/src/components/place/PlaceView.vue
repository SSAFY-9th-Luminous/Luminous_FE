<template>
  <b-container class="bv-example-row mt-3">

    <div class="bord"></div>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="userInfo.memberId === place.member.memberId">
        <b-button variant="outline-info" size="sm" @click="moveModifyPlace" class="mr-2">글수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deletePlace">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card
          :header-html="`<h3>${place.id}.
                      ${place.placeName}
                      </h3>
                      <div>
                      <h6>작성자 : ${place.member.memberId}</h6></div>
                      <span>여행기간 : ${place.createdDate}</span> ~ <span>${place.lastModifiedDate}</span>
                      <div>조회수 :${place.hit} </div>`"
          class="mb-2" border-variant="dark" no-body>
          <b-card-body class="text-left">
            <div>{{ place.placeDescription }}</div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-1" padding-bottom="100px">
      <b-col cols="6">
        <div id="map-view"></div>
      </b-col>
      <b-col cols="6">
        <img :src="place.img" style="width: 100%; height: 300px;">
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import { getPlace } from "@/api/place";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "PlaceView",
  data() {
    return {
      map: null,
      marker: null,
      place: {
        member: {
          memberId: null
        },

      },
      isUserid: false,
      geocoder: null,
      latitude: 0,
      longitude: 0,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.place.content) return this.place.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {

    /* global kakao */
    if (!("geolocation" in navigator)) {
      return;
    }

    let param = this.$route.params.id;
    getPlace(
      param,
      ({ data }) => {
        this.place = data.result;
        console.log(this.place)
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
    moveModifyPlace() {
      this.$router.replace({
        name: "placemodify",
        params: { id: this.place.id },
      });
    },
    deletePlace() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.$router.replace({
          name: "placedelete",
          params: { id: this.place.id },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "placelist" });
    },
    initMap() {

      var map = new kakao.maps.Map(document.getElementById('map-view'), {
        center: new kakao.maps.LatLng(this.place.latitude, this.place.longitude),
        level: 3,
      })
      this.map = map
      this.geocoder = new kakao.maps.services.Geocoder();
      this.map.setMaxLevel(15)

      //마커이미지 설정
      const markerImageUrl = require('@/assets/img/marker/myplace.png');
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
#map-view {
  width: 100%;
  height: 300px;
}

.bord {
  height: 2px;
  width: 100%;
  background-color: rgb(143 143 143);
  margin-top: 20px;
  margin-bottom: 20px;
}

.container {
  width: 100% !important;
}
</style>
