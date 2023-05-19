<template>
  <div>
    <div id="map"></div>
    <b-button @click = searchSubmit>a</b-button>
  </div>
</template>

<script>
import { listObservatory } from "@/api/observatory";
export default {
  name: "KaKaoMap",
  data() {
    return {
      map: null,
      markers: [],
      locations:[],
      marker_locations:[],
      coords:[],
      latitude: 0,
      longitude: 0,
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
    listObservatory(
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


  },
  methods: {
    initMap() {
      console.log(this.markers)
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 1,
      };


      this.map = new kakao.maps.Map(container, options);
      
      this.displayMarker([[this.latitude, this.longitude]]);
      this.geocoder = new kakao.maps.services.Geocoder();
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      const positions = markerPositions.map(
          (position) => new kakao.maps.LatLng(...position)
      );
      if (positions.length > 0) {
        this.markers = positions.map(
            (position) =>
                new kakao.maps.Marker({
                  map: this.map,
                  position,
                })
        );
        
        const bounds = positions.reduce(
            (bounds, latlng) => bounds.extend(latlng),
            new kakao.maps.LatLngBounds()
        );
        this.map.setMinLevel(3);
        this.map.setBounds(bounds);
        console.log(this.marker_locations)
      }
    },
     searchSubmit() {
      let i = 0;
      
      for  (let data of this.locations){
        
        const res = data.address
         this.geocoder.addressSearch(res, (result, status) => {
          console.log(i)
            if (status === kakao.maps.services.Status.OK) {
              this.coords = [result[0].y, result[0].x]
              console.log(this.coords)
            }
            
            if(i === 66){
                this.marker_locations.push(this.coords)
                this.displayMarker(this.marker_locations)

              }else if(i<66){
                this.marker_locations.push(this.coords)
              }   

              i++;
        });

         
      }
    }
  }
}
</script>


<style scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>