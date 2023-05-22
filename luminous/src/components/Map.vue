<template>
  <div>
    <div id="mapwrap"> 
      <div id="map"></div>
      <div class="category">
        <ul>
            <li id="myplaceMenu" @click="changeMarker('myplace')">
                <span class="ico_comm ico_myplace"></span>
                마이플레이스
            </li>
            <li id="observatoryMenu" @click="changeMarker('observatory')">
                <span class="ico_comm ico_observatory"></span>
                천문대
            </li>
            <li id="campingMenu" @click="changeMarker('camping')">
              
                <span class="ico_comm ico_camping"></span>
                캠핑장
            </li>
        </ul>
    </div>
    </div>
  </div>
</template>

<script>
import { observatoryMap } from "@/api/observatory";
import { campingMap} from "@/api/camping"
import { listPlace } from "@/api/place"
export default {
  name: "KaKaoMap",
  data() {
    return {
      map: null,
      marker:null,
      markers: [],
      observatorys:[],
      campings:[],
      myplaceMarkers :[], 
      observatoryMarkers : [], 
      campingMarkers : [],
      myplacePositions:[],
      observatoryPositions:[],
      campingPositions:[],

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
        //다른 페이지를 갔다가 다시 돌아왔을 때
        this.initMap();
      } 
      else {
        //맵페이지를 새로고침했을때
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&libraries=services&autoload=false";
        document.head.appendChild(script);
      }
    }, err => {
      //현재 좌표를 못 불러오는 상황일때
      console.log(err.message);
      this.latitude = 37.500786;
      this.longitude= 127.036886;
      if (window.kakao && window.kakao.maps) {
        //다른 페이지를 갔다가 다시 돌아왔을때
        this.initMap();
      } 
      else {
        //맵페이지를 새로고침했을때
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&libraries=services&autoload=false";
        document.head.appendChild(script);
      }
    })
  },
  mounted() {
    
    let param = {
      category: null,
      keyword: null,
    };
    setTimeout(() => {
      observatoryMap(
        param,
        (response) => {
          this.observatorys = response.data.result;
            this.observatorySearch(); 
            this.createObservatoryMarkers();
        },
        (error) => {
          console.log(error);
        }
      );
      campingMap(
        param,
        (response) => {
          this.campings = response.data.result;
            this.campingSearch();
            this.createCampingMarkers();
        },
        (error) => {
          console.log(error);
        }
      );
      listPlace(
        param,
        (response) => {
          this.myplaces = response.data.result;
            this.myplaceSearch();
            this.createMyplaceMarkers();
        },
        (error) => {
          console.log(error);
        }
      );
    }, 500);
    


  },
  methods: {
    initMap() {
      this.map = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      })
      this.displayMarkerMyCur(new kakao.maps.LatLng(this.latitude, this.longitude));
      this.geocoder = new kakao.maps.services.Geocoder();
      this.map.setMaxLevel(12)
      
    },
    displayMarkerMyCur(locPosition) {
      
      const markerImageUrl = require('@/assets/img/marker/mycur.png');
      const markerSize = new kakao.maps.Size(40, 40);
      const markerOptions = {
        offset: new kakao.maps.Point(20, 20) // Offset the marker image
      };
      const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerSize, markerOptions);
      
      this.marker = new kakao.maps.Marker({
        map: this.map,
        position: locPosition,
        image : markerImage
      })
      
      this.map.setMinLevel(3);
      this.map.setCenter(locPosition)
    },
    createMarkerImage(src, size, options) {
      var markerImage = new kakao.maps.MarkerImage(src, size, options);
      return markerImage;            
    },
    createMarker(position, image) {
      var marker = new kakao.maps.Marker({
          position: position,
          image: image
      });
      
      return marker;  
    },
    createMyplaceMarkers() {
        for (var i = 0; i < this.myplacePositions.length; i++) {  
            
            const markerImageUrl = require('@/assets/img/marker/myplace.png');
            const markerSize = new kakao.maps.Size(60, 60);
            const markerOptions = {
              offset: new kakao.maps.Point(30, 60) // Offset the marker image
            };
            
            // 마커이미지와 마커를 생성합니다
            var markerImage = this.createMarkerImage(markerImageUrl, markerSize, markerOptions),    
                marker = this.createMarker(this.myplacePositions[i], markerImage);  
            
            // 생성된 마커를 마이플레이스 마커 배열에 추가합니다
            this.myplaceMarkers.push(marker);
        }     
    },

    // 마이플레이스 마커들의 지도 표시 여부를 설정하는 함수입니다
    setMyplaceMarkers(map) {        
        for (var i = 0; i < this.myplaceMarkers.length; i++) {  
            this.myplaceMarkers[i].setMap(map);
        }        
    },

    // 천문대 마커를 생성하고 천문대 마커 배열에 추가하는 함수입니다
    createObservatoryMarkers() {
        for (var i = 0; i < this.observatoryPositions.length; i++) {
            const markerImageUrl = require('@/assets/img/marker/observatoryMarker.png');
            const markerSize = new kakao.maps.Size(60, 60);
            const markerOptions = {
              offset: new kakao.maps.Point(30, 60) // Offset the marker image
            };
            // 마커이미지와 마커를 생성합니다
            var markerImage = this.createMarkerImage(markerImageUrl, markerSize, markerOptions);
            var marker = this.createMarker(this.observatoryPositions[i], markerImage);  

            // 생성된 마커를 천문대 마커 배열에 추가합니다
            this.observatoryMarkers.push(marker);    
        }        
    },

    // 천문대 마커들의 지도 표시 여부를 설정하는 함수입니다
    setObservatoryMarkers(map) {        
        for (var i = 0; i < this.observatoryMarkers.length; i++) {  
            this.observatoryMarkers[i].setMap(map);
        }        
    },

    // 캠핑장 마커를 생성하고 캠핑장 마커 배열에 추가하는 함수입니다
    createCampingMarkers() {
        for (var i = 0; i < this.campingPositions.length; i++) {
            
            const markerImageUrl = require('@/assets/img/marker/campingMarker.png');
            const markerSize = new kakao.maps.Size(60, 60);
            const markerOptions = {
              offset: new kakao.maps.Point(30, 60) // Offset the marker image
            };
            // 마커이미지와 마커를 생성합니다
            var markerImage = this.createMarkerImage(markerImageUrl, markerSize, markerOptions);
            var marker = this.createMarker(this.campingPositions[i], markerImage);  

            // 생성된 마커를 캠핑장 마커 배열에 추가합니다
            this.campingMarkers.push(marker);    
        }              
    },

    // 캠핑장 마커들의 지도 표시 여부를 설정하는 함수입니다
    setCampingMarkers(map) {        
        for (var i = 0; i < this.campingMarkers.length; i++) {
          this.campingMarkers[i].setMap(map);
        }        
    },

 
    observatorySearch() {
      for (let data of this.observatorys){
          let observatoryPosition = new kakao.maps.LatLng(data.latitude, data.longitude)
          
          this.observatoryPositions.push(observatoryPosition);
      }
    },
    
    
    campingSearch() {
      for (let data of this.campings){
          let campingPosition = new kakao.maps.LatLng(data.latitude, data.longitude)
          
          this.campingPositions.push(campingPosition);
      }
    },
    myplaceSearch() {
      for (let data of this.myplaces){
          let myplacePosition = new kakao.maps.LatLng(data.latitude, data.longitude)

          this.myplacePositions.push(myplacePosition);
      }
    },
    changeMarker(type){
        var myplaceMenu = document.getElementById('myplaceMenu');
        var observatoryMenu = document.getElementById('observatoryMenu');
        var campingMenu = document.getElementById('campingMenu');
        // 마이플레이스 카테고리가 클릭됐을 때
        if (type === 'myplace') {
            
            // 마이플레이스 카테고리를 선택된 스타일로 변경하고
            if(myplaceMenu.className === 'menu_selected'){
              this.setMyplaceMarkers(null);
              myplaceMenu.className = '';
            }else{
              myplaceMenu.className = 'menu_selected';
              this.setMyplaceMarkers(this.map);
            }
            
            
            // 마이플레이스 마커들만 지도에 표시하도록 설정합니다
            
        } if (type === 'observatory') { // 천문대 카테고리가 클릭됐을 때
            if(observatoryMenu.className === 'menu_selected'){
              this.setObservatoryMarkers(null);
              observatoryMenu.className = '';
            }else{
              observatoryMenu.className = 'menu_selected';
              this.setObservatoryMarkers(this.map);
            }
            
            // 천문대 마커들만 지도에 표시하도록 설정합니다
            
        } if (type === 'camping') { // 캠핑장 카테고리가 클릭됐을 때
            if(campingMenu.className === 'menu_selected'){
              this.setCampingMarkers(null);
              campingMenu.className = '';
            }else{
              campingMenu.className = 'menu_selected';
              this.setCampingMarkers(this.map);  
            }
            
            // 캠핑장 마커들만 지도에 표시하도록 설정합니다
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
#mapwrap{position:relative;overflow:hidden;}
.category, .category *{margin:0;padding:0;color:#000;border-radius: 10px}   
.category {position:absolute;overflow:hidden;top:10px;left:10px;height:50px;z-index:10;border:1px solid black;font-family:'Malgun Gothic','맑은 고딕',sans-serif;font-size:12px;text-align:center;background-color:#b7c3ebd8;}
.category .menu_selected {border-radius: 0px;background:#5c94d3;color:#fff;border-left:1px solid #915B2F;border-right:1px solid #915B2F;} 
.category li{list-style:none;float:left;width:50px;height:50px;padding-top:5px;cursor:pointer;} 
.category .ico_comm {display:block;margin:0 auto 2px;width:22px;height:26px;} 
.category .ico_myplace {background-size : cover; background-image : url('~@/assets/img/marker/myplace.png'); background-repeat: no-repeat; background-position:  center center;}  
.category .ico_observatory {background-size : cover; background-image : url('~@/assets/img/marker/observatoryMarker.png'); background-repeat: no-repeat; background-position:  center center;}   
.category .ico_camping {background-size : cover; background-image : url('~@/assets/img/marker/campingMarker.png'); background-repeat: no-repeat; background-position:  center center;} 
</style>