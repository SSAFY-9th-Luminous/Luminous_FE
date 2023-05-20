<template>
  <div>
    <div id="map"></div>
    <b-button @click = observatorySearch>천문대</b-button> |
    <b-button @click = campingSearch>camping</b-button> |
    <b-button @click = myplaceSearch>myplace</b-button>
  </div>
</template>

<script>
import { observatoryMap } from "@/api/observatory";
import {campingMap} from "@/api/camping"
export default {
  name: "KaKaoMap",
  data() {
    return {
      map: {
        
      },
      markers: [],
      locations:[],
      campings:[],
      marker_locations:[],
      place_coords:[],
      camping_coords:[],
      latitude: 0,
      longitude: 0,
      level : 3,
      category: null,
      options: [
          { value: null, text: '옵션' },
          { value: 'place', text: '제목' },
          { value: 'user', text: '작성자' },
          { value: 'desc', text: '설명' },
        ],
      keyword : "",
      geocoder:null,
    }
  },
  created() {
    /* global kakao */
    if (!("geolocation" in navigator)) {
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } 
      else {
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&libraries=services&autoload=false";
        document.head.appendChild(script);
      }
    }, err => {
      console.log(err.message);
      this.latitude = 37.500786;
      this.longitude= 127.036886;
      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } 
      else {
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&libraries=services&autoload=false";
        document.head.appendChild(script);
      }
    })
    let param = {
      category: null,
      keyword: null,
    };
    observatoryMap(
      param,
      (response) => {
        // console.log(response)
        this.locations = response.data;
        console.log(this.locations)
      },
      (error) => {
        console.log(error);
      }
    );
     campingMap(
      param,
      (response) => {
        // console.log(response)
        this.campings = response.data.result;
        console.log(this.campings)
      },
      (error) => {
        console.log(error);
      }
    );

  },
  methods: {
    initMap() {
      this.map = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      })
      this.displayMarkerMyCur([[this.latitude, this.longitude]]);
      this.geocoder = new kakao.maps.services.Geocoder();
      this.map.setMaxLevel(10)
      
    },
    displayMarkerMyCur(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      const positions = markerPositions.map(
          (position) => new kakao.maps.LatLng(...position)
      );
      const markerImageUrl = require('@/assets/img/marker/mycur.png');
      const markerSize = new kakao.maps.Size(40, 40);
      const markerOptions = {
        offset: new kakao.maps.Point(20, 20) // Offset the marker image
      };
      const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerSize, markerOptions);
      if (positions.length > 0) {
        this.markers = positions.map(
            (position) =>
                new kakao.maps.Marker({
                  map: this.map,
                  position,
                  image : markerImage
                })
        );
        
        const bounds = positions.reduce(
            (bounds, latlng) => bounds.extend(latlng),
            new kakao.maps.LatLngBounds()
        );
        this.map.setMinLevel(3);
        this.map.setBounds(bounds);
      }
    },
    displayMarkerMyPlace(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      const positions = markerPositions.map(
          (position) => new kakao.maps.LatLng(...position)
      );
      const markerImageUrl = require('@/assets/img/marker/myplace.png');
      const markerSize = new kakao.maps.Size(44, 44);
      const markerOptions = {
        offset: new kakao.maps.Point(22, 22) // Offset the marker image
      };
      const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerSize, markerOptions);
      if (positions.length > 0) {
        this.markers = positions.map(
            (position) =>
                new kakao.maps.Marker({
                  map: this.map,
                  position,
                  image : markerImage
                })
        );
        
        const bounds = positions.reduce(
            (bounds, latlng) => bounds.extend(latlng),
            new kakao.maps.LatLngBounds()
        );
        this.map.setMinLevel(3);
        this.map.setBounds(bounds);
      }
    },
    displayMarkerCamping(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      const positions = markerPositions.map(
          (position) => new kakao.maps.LatLng(...position)
      );
      const markerImageUrl = require('@/assets/img/marker/campingMarker.png');
      const markerSize = new kakao.maps.Size(60, 60);
      const markerOptions = {
        offset: new kakao.maps.Point(30, 60) // Offset the marker image
      };
  
      const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerSize, markerOptions);
      if (positions.length > 0) {
        this.markers = positions.map(
            (position) =>
                new kakao.maps.Marker({
                  map: this.map,
                  position,
                  image : markerImage
                })
        );
        
        // const bounds = positions.reduce(
        //     (bounds, latlng) => bounds.extend(latlng),
        //     new kakao.maps.LatLngBounds()
        // );
        // this.map.setMinLevel(3);
        // this.map.setBounds(bounds);
      }
    },
    displayObservatoryMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      const positions = markerPositions.map(
          (position) => new kakao.maps.LatLng(...position)
      );
      const markerImageUrl = require('@/assets/img/marker/observatoryMarker.png');
      const markerSize = new kakao.maps.Size(60, 60);
      const markerOptions = {
        offset: new kakao.maps.Point(30, 60) // Offset the marker image
      };
  
      const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerSize, markerOptions);
      if (positions.length > 0) {
        this.markers = positions.map(
            (position) =>
                new kakao.maps.Marker({
                  map: this.map,
                  position,
                  image : markerImage
                })
        );
        
        const bounds = positions.reduce(
            (bounds, latlng) => bounds.extend(latlng),
            new kakao.maps.LatLngBounds()
        );
        this.map.setMinLevel(3);
        this.map.setBounds(bounds);
      }
    },
    ObservatorySearch() {
      let i = 0;
      
      for  (let data of this.locations){
        
        const addr = data.address
         this.geocoder.addressSearch(addr, (result, status) => {
          console.log(i)
            if (status === kakao.maps.services.Status.OK) {
              this.place_coords = [result[0].y, result[0].x]
              console.log(this.coords)
            }
            
            if(i === 66){
                this.marker_locations.push(this.place_coords)

              }else if(i<66){
                this.marker_locations.push(this.place_coords)
              }   

              i++;
        });

         
      }
      this.displayMarker(this.marker_locations)
    },
    campingSearch() {
      for (let data of this.campings){
              this.camping_coords = [data.latitude, data.longitude]
          this.marker_locations.push(this.camping_coords);
      }
          this.displayMarkerCamping(this.marker_locations)
    },
    myPlaceSearch() {
      for (let data of this.myplaces){
          this.myplace_coords = [data.latitude, data.longitude]
          this.marker_locations.push(this.myplace_coords);
      }
          this.displayMarkerMyPlace(this.marker_locations)
    },
  }
}
</script>


<style scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>