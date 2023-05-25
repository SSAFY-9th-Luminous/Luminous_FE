<template>
  <div>
    <b-container class="bv-example-row mt-3 text-center">
      <h3><b-icon icon="map"></b-icon> 지도</h3>
    <div id="mapwrap" class = "mt-5"> 
      <div id="map">
    </div>
    <!-- <b-button id= "sidebarbutton" @click = "layoutHide()">=</b-button>
    <div id="menu_wrap" class="bg_white" v-if="isDivVisible">
        <div class="option">
            <div>
                <form onsubmit="searchPlaces(); return false;">
                   <input type="text" placeholder="..." id="keyword" size="15" class= "ml-3"> 
                    <b-button type="submit" style="height : 25px; line-height : 1px; text-align: center;">검색</b-button> 
                </form>
            </div>
        </div>
        <hr>
        <ul id="placesList"></ul>
        <div id="pagination"></div>
    </div> -->
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
            <li id="weatherMenu" @click="changeMarker('weather')">
              
                <span class="ico_comm ico_weather"></span>
                날씨
            </li>
        </ul>
    </div>
    </div>
    </b-container>
  </div>
</template>

<script>
import { observatoryMap } from "@/api/observatory";
import { campingMap} from "@/api/camping"
import { listPlace } from "@/api/place"
import { getTodayWeatherSky } from "@/api/weather";
export default {
  name: "KaKaoMap",
  data() {
    return {
      isDivVisible:false,
      map: null,
      marker:null,
      markers: [],
      observatorys:[],
      campings:[],
      myplaceMarkers :[], 
      observatoryMarkers : [], 
      campingMarkers : [],
      WeatherMarkers:[],
      myplacePositions:[],
      observatoryPositions:[],
      campingPositions:[],
      weatherPositions:[],
      seoul:null,
      k:null,
      c:null,
      b:null,
      z:null,
      j:null,
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
          console.log(this.observatorys)
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
          console.log(this.campings)
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
          console.log(this.myplaces)
            this.myplaceSearch();
            this.createMyplaceMarkers();
        },
        (error) => {
          console.log(error);
        }
      );
      getTodayWeatherSky((response)=>{
        this.weatherPositions = response.data.result;
        console.log(this.weatherPositions)
        // console.log(this.weatherPositions[0].fcstValue)
        this.createWeatherMarkers();
        
      },
      (error) =>{
        console.log(error);
      })
    }, 500);
  },
  methods: {
    layoutHide(){
      if(this.isDivVisible===true){
        this.isDivVisible = false;
      }else{
        this.isDivVisible = true;
      }
    },
    initMap() {
      var map = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      })
      this.map = map;
      this.displayMarkerMyCur(new kakao.maps.LatLng(this.latitude, this.longitude));
      // this.displayMarkerWeather2(new kakao.maps.LatLng(38, 128));//강원
      // this.displayMarkerWeather3(new kakao.maps.LatLng(37, 127));//충청
      // this.displayMarkerWeather4(new kakao.maps.LatLng(36, 129));//경상
      // this.displayMarkerWeather5(new kakao.maps.LatLng(35, 127));//전라
      // this.displayMarkerWeather6(new kakao.maps.LatLng(33, 127));//제주
      this.geocoder = new kakao.maps.services.Geocoder();
      this.map.setMaxLevel(12)
      var iwContent = '<div style="padding:5px;">현재 위치입니다!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
          content : iwContent,
          zIndex:10,
          removable : iwRemoveable
      });
      
      kakao.maps.event.addListener(this.marker, 'click', ()=> {
        infowindow.open(map, this.marker);  
      });
      
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
        image : markerImage,
          clickable: true
      })
      
      this.map.setMinLevel(3);
      this.map.setCenter(locPosition)
    },
    displayMarkerWeather1(locPosition) {
      let markerImageUrl = null;
      
      if(this.weatherPositions[0].fcstValue === 1){
        markerImageUrl = require('@/assets/img/weather/1.png');
      }else if(this.weatherPositions[0].fcstValue === 3){
        markerImageUrl = require('@/assets/img/weather/3.png');
      }else{
        markerImageUrl = require('@/assets/img/weather/4.png');  
      }
      const markerSize = new kakao.maps.Size(40, 40);
      const markerOptions = {
        offset: new kakao.maps.Point(20, 20) // Offset the marker image
      };
      const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerSize, markerOptions);
      
      this.seoul = new kakao.maps.Marker({
        map: this.map,
        position: locPosition,
        image : markerImage,
          clickable: true
      })
      
    },
    displayMarkerWeather2(locPosition) {
      let markerImageUrl = null;
      if(this.weatherPositions[1].fcstValue === 1){
        markerImageUrl = require('@/assets/img/weather/1.png');
      }else if(this.weatherPositions[1].fcstValue === 3){
        markerImageUrl = require('@/assets/img/weather/3.png');
      }else{
        markerImageUrl = require('@/assets/img/weather/4.png');  
      }
      const markerSize = new kakao.maps.Size(40, 40);
      const markerOptions = {
        offset: new kakao.maps.Point(20, 20) // Offset the marker image
      };
      const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerSize, markerOptions);
      
      this.k = new kakao.maps.Marker({
        map: this.map,
        position: locPosition,
        image : markerImage,
          clickable: true
      })
      
    },
    displayMarkerWeather3(locPosition) {
      let markerImageUrl = null;
      if(this.weatherPositions[2].fcstValue === 1){
        markerImageUrl = require('@/assets/img/weather/1.png');
      }else if(this.weatherPositions[2].fcstValue === 3){
        markerImageUrl = require('@/assets/img/weather/3.png');
      }else{
        markerImageUrl = require('@/assets/img/weather/4.png');  
      }
      const markerSize = new kakao.maps.Size(40, 40);
      const markerOptions = {
        offset: new kakao.maps.Point(20, 20) // Offset the marker image
      };
      const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerSize, markerOptions);
      
      this.c = new kakao.maps.Marker({
        map: this.map,
        position: locPosition,
        image : markerImage,
          clickable: true
      })
      
    },
    displayMarkerWeather4(locPosition) {
      let markerImageUrl = null;
      if(this.weatherPositions[3].fcstValue === 1){
        markerImageUrl = require('@/assets/img/weather/1.png');
      }else if(this.weatherPositions[3].fcstValue === 3){
        markerImageUrl = require('@/assets/img/weather/3.png');
      }else{
        markerImageUrl = require('@/assets/img/weather/4.png');  
      }
      const markerSize = new kakao.maps.Size(40, 40);
      const markerOptions = {
        offset: new kakao.maps.Point(20, 20) // Offset the marker image
      };
      const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerSize, markerOptions);
      
      this.b = new kakao.maps.Marker({
        map: this.map,
        position: locPosition,
        image : markerImage,
          clickable: true
      })
      
    },
    displayMarkerWeather5(locPosition) {
      let markerImageUrl = null;
      if(this.weatherPositions[4].fcstValue === 1){
        markerImageUrl = require('@/assets/img/weather/1.png');
      }else if(this.weatherPositions[4].fcstValue === 3){
        markerImageUrl = require('@/assets/img/weather/3.png');
      }else{
        markerImageUrl = require('@/assets/img/weather/4.png');  
      }
      const markerSize = new kakao.maps.Size(40, 40);
      const markerOptions = {
        offset: new kakao.maps.Point(20, 20) // Offset the marker image
      };
      const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerSize, markerOptions);
      
      this.z = new kakao.maps.Marker({
        map: this.map,
        position: locPosition,
        image : markerImage,
          clickable: true
      })
      
    },
    displayMarkerWeather6(locPosition) {
      let markerImageUrl = null;
      if(this.weatherPositions[5].fcstValue === 1){
        markerImageUrl = require('@/assets/img/weather/1.png');
      }else if(this.weatherPositions[5].fcstValue === 3){
        markerImageUrl = require('@/assets/img/weather/3.png');
      }else{
        markerImageUrl = require('@/assets/img/weather/4.png');  
      }
      const markerSize = new kakao.maps.Size(40, 40);
      const markerOptions = {
        offset: new kakao.maps.Point(20, 20) // Offset the marker image
      };
      const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerSize, markerOptions);
      
      this.j = new kakao.maps.Marker({
        map: this.map,
        position: locPosition,
        image : markerImage,
          clickable: true
      })
      
    },
    createMarkerImage(src, size, options) {
      var markerImage = new kakao.maps.MarkerImage(src, size, options);
      return markerImage;            
    },
    createMarker(position, zindex, image) {
      var marker = new kakao.maps.Marker({
          position: position,
          image: image,
          zIndex:zindex,
          clickable: true
      });
      
      return marker;  
    },
    createcustomOverlay(position, image, zindex, name, id){ 
      var overlay = new kakao.maps.CustomOverlay({
          map: null,
          clickable: true,
          content: `<div class="customOverlay mb-5" style = "background-color:white; border-radius:10px">`+
          
                      `<div><b-button style="position: absolute;top: 10px;right: 10px;width: 30px;height: 30px; z-index: 10;" 
                      @click = "makeOutListener(${id})" title="닫기"></b-button></div>`+
                      `<img src="${image}" width="70" height = "70" style = "border-radius:10px"/>`+
                      `<a href="http://localhost:8080/camping/view/${id}">${name}</a></div>`,
          position: position,
          xAnchor: 0.5,
          yAnchor: 1,
          zIndex: zindex
      });
      return overlay;
    },
    createMyplaceMarkers() {
        for (var i = 0; i < this.myplacePositions.length; i++) {  
            
            const markerImageUrl = require('@/assets/img/marker/myplace.png');
            const markerSize = new kakao.maps.Size(60, 60);
            const markerOptions = {
              offset: new kakao.maps.Point(30, 60) // Offset the marker image
            };
            
            // 마커이미지와 마커를 생성합니다
            var markerImage = this.createMarkerImage(markerImageUrl, markerSize, markerOptions);
            var marker = this.createMarker(this.myplacePositions[i].latlng, 2,  markerImage);  
            var iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
            var infowindow = new kakao.maps.InfoWindow({
                content: this.myplacePositions[i].content, // 인포윈도우에 표시할 내용
                zIndex:10,
                removable :iwRemoveable 
            });
    
            kakao.maps.event.addListener(marker, 'click', this.makeOverListener(this.map, marker, infowindow));
            // kakao.maps.event.addListener(marker, 'mouseout', this.makeOutListener(infowindow));
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
            var marker = this.createMarker(this.observatoryPositions[i].latlng, 3, markerImage);  
            var iwRemoveable = true;
            // 생성된 마커를 천문대 마커 배열에 추가합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: this.observatoryPositions[i].content, // 인포윈도우에 표시할 내용
                zIndex:10,
                removable : iwRemoveable
            });

            kakao.maps.event.addListener(marker, 'click', this.makeOverListener(this.map, marker, infowindow));
            // kakao.maps.event.addListener(marker, 'click', this.makeOutListener(infowindow));
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
            var marker = this.createMarker(this.campingPositions[i].latlng, 1,  markerImage);  
            var iwRemoveable = true;
            var infowindow = new kakao.maps.InfoWindow({
                content: this.campingPositions[i].content, // 인포윈도우에 표시할 내용
                zIndex:10,
                removable : iwRemoveable
            });

            
            kakao.maps.event.addListener(marker, 'click', this.makeOverListener(this.map, marker, infowindow));
            // kakao.maps.event.addListener(marker, 'doubleclick', this.this.makeOutListener(this.campingPositions[i].overlay));
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
    createWeatherMarkers() {
        for (var i = 0; i < this.weatherPositions.length; i++) {
          let markerImageUrl = null;

          if(this.weatherPositions[i].fcstValue === 1){
            markerImageUrl = require('@/assets/img/weather/1.png');
          }else if(this.weatherPositions[i].fcstValue === 3){
            markerImageUrl = require('@/assets/img/weather/3.png');
          }else{
            markerImageUrl = require('@/assets/img/weather/4.png');  
          }
          const markerSize = new kakao.maps.Size(80, 80);
          const markerOptions = {
            offset: new kakao.maps.Point(40, 40) // Offset the marker image
          };
          const markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerSize, markerOptions);
          var marker = null;  
          if(i == 0){
            marker = this.createMarker(new kakao.maps.LatLng(38, 127), 1,  markerImage);  
          }else if(i == 1){
            marker = this.createMarker(new kakao.maps.LatLng(38, 128), 1,  markerImage);  
          }else if(i == 2){
            marker = this.createMarker(new kakao.maps.LatLng(37, 127), 1,  markerImage);  
          }else if(i == 3){
            marker = this.createMarker(new kakao.maps.LatLng(36, 129), 1,  markerImage);  
          }else if(i == 4){
            marker = this.createMarker(new kakao.maps.LatLng(35, 127), 1,  markerImage);  
          }else{
            marker = this.createMarker(new kakao.maps.LatLng(33, 127), 1,  markerImage);  
          }

          this.WeatherMarkers.push(marker);    
        }              
    },
    setWeatherMarkers(map) {        
        for (var i = 0; i < this.WeatherMarkers.length; i++) {
          this.WeatherMarkers[i].setMap(map);
        }        
    },

    observatorySearch() {
      for (let data of this.observatorys){
          let observatoryPosition = new kakao.maps.LatLng(data.latitude, data.longitude)
          
          this.observatoryPositions.push({
            content:
            '        <div><br></div>' + 
            '            <div class="img" >' +
            `                <img src="${data.imageUrl}" width="80" height="80" style ="float:right; margin-right:10px">` +
            '        <div style = "height:90px;width:240px;">' + 
                        data.observatoryName + 
            '        </div>' + 
            `                <div><a href="http://localhost:8080/observatory/view/${data.id}" target="_self" class="link" >상세정보</a></div>` + 
            '           </div>' +
            '        <div style = "height:5px"></div>',
            // '<div>'+data.observatoryName+'</div>',
            latlng: observatoryPosition
          });
      }
    },
    
    
    campingSearch() {
      for (let data of this.campings){
          let campingPosition = new kakao.maps.LatLng(data.latitude, data.longitude)
          // var overlay = this.createcustomOverlay(campingPosition, data.imageUrl, 4, data.campingName, data.id);
          this.campingPositions.push({
            content: 
            '        <div><br></div>' + 
            '            <div class="img" >' +
            `                <img src="${data.imageUrl}" width="80" height="80" style ="float:right; margin-right:10px">` +
            '        <div style = "height:90px;width:240px;">' + 
                        data.campingName + 
            '        </div>' + 
            `                <div><a href="http://localhost:8080/camping/view/${data.id}" target="_self" class="link" >상세정보</a></div>` + 
            '           </div>' +
            '        <div style = "height:5px"></div>',
            // content:'<div>'+data.campingName+'</div>',
            latlng: campingPosition
          });
      }
    },
    myplaceSearch() {
      for (let data of this.myplaces){
          let myplacePosition = new kakao.maps.LatLng(data.latitude, data.longitude)
          
          this.myplacePositions.push({
            content: 
            '        <div><br></div>' + 
            '            <div class="img" >' +
            `                <img src="${data.img}" width="80" height="80" style ="float:right; margin-right:10px">` +
            '        <div style = "height:90px;width:240px;">' + 
                        data.placeName + 
            '        </div>' + 
            `                <div><a href="http://localhost:8080/place/view/${data.id}" target="_self" class="link" >상세정보</a></div>` + 
            '           </div>' +
            '        <div style = "height:5px"></div>',
            // content:'<div>'+data.placeName+'</div>',
            latlng: myplacePosition
          });
      }
    },
    changeMarker(type){
        var myplaceMenu = document.getElementById('myplaceMenu');
        var observatoryMenu = document.getElementById('observatoryMenu');
        var campingMenu = document.getElementById('campingMenu');
        var weatherMenu = document.getElementById('weatherMenu');
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
        }  if (type === 'weather') { // 캠핑장 카테고리가 클릭됐을 때
            if(weatherMenu.className === 'menu_selected'){
              this.setWeatherMarkers(null);
              weatherMenu.className = '';
            }else{
              weatherMenu.className = 'menu_selected';
              this.setWeatherMarkers(this.map);  
              
            }
            
            // 캠핑장 마커들만 지도에 표시하도록 설정합니다
        } 
    }, 
    makeOverListener(map, marker, infowindow) {
      return function() {
        infowindow.open(map, marker);
      };
    },

    // makeOutListener() {
    //   console.log("closed")
    //   return function() {
        
    //     this.campingPositions[i].overlay.setMap(null);
    // };
    // },
    
    
  }
}
</script>


<style scoped>
#map {
  width: 100%;
  height: 700px;
  border-radius: 15px;
}

#sidebarbutton{position:absolute; z-index: 1;top:10px;left:10px;height:50px;z-index:5; height:35px }

#mapwrap{position:relative;overflow:hidden;}

.category, .category *{margin:0;padding:0;color:#000;border-radius: 10px}   
.category {position:absolute;overflow:hidden;top:15px;right:15px;height:50px;z-index:20;border:1px solid black;font-family:'Malgun Gothic','맑은 고딕',sans-serif;font-size:12px;text-align:center;background-color:#b7c3ebd8;}
.category .menu_selected {border-radius: 0px;background:#5c94d3;color:#fff;border-left:1px solid #2f3691;border-right:1px solid #2f3691;} 
.category li{list-style:none;float:left;width:50px;height:50px;padding-top:5px;cursor:pointer;} 
.category .ico_comm {display:block;margin:0 auto 2px;width:22px;height:26px;} 
.category .ico_myplace {background-size : cover; background-image : url('~@/assets/img/marker/myplace.png'); background-repeat: no-repeat; background-position:  center center;}  
.category .ico_observatory {background-size : cover; background-image : url('~@/assets/img/marker/observatoryMarker.png'); background-repeat: no-repeat; background-position:  center center;}   
.category .ico_camping {background-size : cover; background-image : url('~@/assets/img/marker/campingMarker.png'); background-repeat: no-repeat; background-position:  center center;} 
.category .ico_weather {background-size : cover; background-image : url('~@/assets/img/weather/1.png'); background-repeat: no-repeat; background-position:  center center;} 
.map_wrap, .map_wrap * {margin:0;padding:0;font-family:'Malgun Gothic',dotum,'돋움',sans-serif;font-size:12px;}
.map_wrap a, .map_wrap a:hover, .map_wrap a:active{color:#000;text-decoration: none;}
.map_wrap {position:relative;width:100%;height:500px;}
#menu_wrap {position:absolute;top:0;left:0;bottom:0;width:250px;margin:10px 0 30px 10px;padding:5px;overflow-y:auto;background:rgba(255, 255, 255, 0.7);z-index: 1;font-size:12px;border-radius: 10px;}
.bg_white {background:#fff;}
#menu_wrap hr {display: block; height: 1px;border: 0; border-top: 2px solid #5F5F5F;margin:3px 0;}
#menu_wrap .option{text-align: center;}
#menu_wrap .option p {margin:10px 0;}  
#menu_wrap .option button {margin-left:5px;}
#placesList li {list-style: none;}
#placesList .item {position:relative;border-bottom:1px solid #888;overflow: hidden;cursor: pointer;min-height: 65px;}
#placesList .item span {display: block;margin-top:4px;}
#placesList .item h5, #placesList .item .info {text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
#placesList .item .info{padding:10px 0 10px 55px;}
#placesList .info .gray {color:#8a8a8a;}
#placesList .info .jibun {padding-left:26px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;}
#placesList .info .tel {color:#009900;}
#placesList .item .markerbg {float:left;position:absolute;width:36px; height:37px;margin:10px 0 0 10px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;}
#placesList .item .marker_1 {background-position: 0 -10px;}
#placesList .item .marker_2 {background-position: 0 -56px;}
#placesList .item .marker_3 {background-position: 0 -102px}
#placesList .item .marker_4 {background-position: 0 -148px;}
#placesList .item .marker_5 {background-position: 0 -194px;}
#placesList .item .marker_6 {background-position: 0 -240px;}
#placesList .item .marker_7 {background-position: 0 -286px;}
#placesList .item .marker_8 {background-position: 0 -332px;}
#placesList .item .marker_9 {background-position: 0 -378px;}
#placesList .item .marker_10 {background-position: 0 -423px;}
#placesList .item .marker_11 {background-position: 0 -470px;}
#placesList .item .marker_12 {background-position: 0 -516px;}
#placesList .item .marker_13 {background-position: 0 -562px;}
#placesList .item .marker_14 {background-position: 0 -608px;}
#placesList .item .marker_15 {background-position: 0 -654px;}
#pagination {margin:10px auto;text-align: center;}
#pagination a {display:inline-block;margin-right:10px;}
#pagination .on {font-weight: bold; cursor: default;color:#777;}
</style>