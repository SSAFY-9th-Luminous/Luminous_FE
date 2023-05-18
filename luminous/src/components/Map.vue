<template>
  <div>
    <div id="map"></div>
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
    }
  },
  created() {
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
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&autoload=false";
        document.head.appendChild(script);
      }
    }, err => {
      alert(err.message);
    })
    let param = {
      category: null,
      keyword: null,
    };
    listObservatory(
      param,
      (response) => {
        console.log(response)
        // this.locations = data;
        // console.log(this.locations)
      },
      (error) => {
        console.log(error);
      }
    );


  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
      this.displayMarker([[this.latitude, this.longitude]]);
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
        this.map.setBounds(bounds);
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