<template>
  <div>
    <b-row class="mb-1">
    <div class="col-xl-6 col-lg-6 col-md-6">

    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group class="col-md-6" hidden id="memberId-group" label="작성자:" label-for="memberId" description="작성자를 입력하세요.">
          <b-form-input 
            id="memberId"
            :disabled="isUserid"
            v-model=userInfo.memberId
            type="text"
            required
            placeholder="작성자"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="placeName-group" label="제목:" label-for="placeName" description="제목을 입력하세요.">
          <b-form-input
            id="placeName"
            v-model="place.placeName"
            type="text"
            required
            placeholder="제목"
          ></b-form-input>
        </b-form-group>
        <div class="col-md-6">
        </div>
        <div class = "row g-6">
        <b-form-group class="col-md-6" id="visitedDate-group" label="방문 날짜:" >
          <b-form-input
            id="visitedDate"
            v-model="place.visitedDate"
            type="date"
            required
            placeholder="방문날짜"
          ></b-form-input>
        </b-form-group>
        <b-form-group class="col-md-6" id="img-group" label="이미지:" >
          <b-form-file @change="previewImage" accept=".jpg, .png" id="img" v-model="place.img" placeholder="이미지 업로드"></b-form-file>
        </b-form-group>
        
        </div>
        <b-form-group id="placeDescription-group" label="내용:" label-for="placeDescription">
          <b-form-textarea
            id="placeDescription"
            v-model="place.placeDescription"
            placeholder="내용 입력"
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'register'">글작성</b-button>
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
    </div>
    <div class="col-xl-6 col-lg-6 col-md-6" style="text-align: left">
      <div id = "map"></div>
      <b-form-group id="address-group" class = "mt-2" label="주소:" label-size="sm" label-for="address" description="주소를 검색하거나 위치를 지도에 클릭해주세요.">
        <div class = "mb-1"><b-button  @click="execDaumPostcode()" >주소 검색</b-button><br></div>
          <b-form-input
            id="address"
            v-model="place.address"
            type="text"
            required
            placeholder="주소"
            readonly
          ></b-form-input>
        </b-form-group></div>  
  </b-row>
  <b-card v-if="previewImageData">
    <b-img :src="previewImageData"></b-img>
  </b-card>
    </div>
</template>

<script>
import { writePlace, modifyPlace, getPlace } from "@/api/place";
import { mapState } from "vuex";
const memberStore = "memberStore";
export default {
  name: "PlaceInputItem",
  data() {
    return {
      map:null,
      marker:null,
      place: {
        id: 0,
        memberId: "",
        placeName: "",
        placeDescription: "",
        visitedDate: null,
        img: null,
        latitude: 37.50140734,
        longitude: 127.0380327,
        address: null,
        rate: 0.0,
        hit: 0,
      },
      isUserid: false,
      geocoder:null,
      latitude:0,
      longitude:0,
      postcode: "",
      address: "",
      extraAddress: "",
      previewImageData: null
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    
  
  
    /* global kakao */
    if (!("geolocation" in navigator)) {
      return;
    }
    if (this.type === "modify") {
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
    }else{
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&libraries=services&autoload=false";
        document.head.appendChild(script);
      }, err => {
        console.log(err.message);
        this.latitude = 37.500786;
        this.longitude= 127.036886;
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&libraries=services&autoload=false";
        document.head.appendChild(script);
      })
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      let err = true;
      let msg = "";
      err && !this.place.placeName && ((msg = "제목 입력해주세요"), (err = false), this.$refs.placeName.focus());
      err && !this.place.placeDescription && ((msg = "내용 입력해주세요"), (err = false), this.$refs.placeDescription.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registplace() : this.modifyPlace();
    },
    onReset(event) {
      event.preventDefault();
      this.place.placeName = "";
      this.place.placeDescription = "";
      this.moveList();
    },
    registplace() {
      // let param = {
      //   placeName: this.place.placeName,
      //   placeDescription: this.place.placeDescription,
      //   visitedDate: this.place.visitedDate,
      //   img: this.place.img.name,
      //   latitude: this.place.latitude,
      //   longitude: this.place.longitude,
      //   address: this.place.address,
      //   rate:this.place.rate,
      //   id : this.userInfo.id
      // };
      // console.log(param)
      const formData = new FormData();
      formData.append('placeName', this.place.placeName)
      formData.append('placeDescription', this.place.placeDescription)
      formData.append('visitedDate', this.place.visitedDate)
      formData.append('img', this.place.img)
      formData.append('latitude', this.place.latitude)
      formData.append('longitude', this.place.longitude)
      formData.append('address', this.place.address)
      formData.append('rate', this.place.rate)
      formData.append('id', this.userInfo.id)
      for (let value of formData.values()) {
        console.log(value);
      }
      writePlace(
        formData,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data.isSuccess === true) {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    initMap() {
      
      var map = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng( this.place.latitude, this.place.longitude),
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
      this.marker = marker
      // 지도에 마커를 표시합니다
      marker.setMap(this.map);

      kakao.maps.event.addListener(map, 'click', (mouseEvent)=> {
        marker.setPosition(mouseEvent.latLng);
        marker.setMap(map);


        this.searchDetailAddrFromCoords(mouseEvent.latLng, (result, status)=> {
          if (status === kakao.maps.services.Status.OK) {
            let latlng = mouseEvent.latLng
            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(latlng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            
            this.place.address = result[0].address.address_name
            this.place.latitude = latlng.getLat()
            this.place.longitude = latlng.getLng()
                
          }
        });
      });
    },  
    searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        this.geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    },

    searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        this.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    },

    modifyPlace() {
      let param = {
        id : this.place.id,
        placeName: this.place.placeName,
        placeDescription: this.place.placeDescription,
        visitedDate: this.place.visitedDate,
        img: this.place.img.name,
        latitude: this.place.latitude,
        longitude: this.place.longitude,
        address: this.place.address,
        rate:this.place.rate,
      };
      
      modifyPlace(
        param,
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data.isSuccess === true) {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "placelist" });
    },
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.place.address = data.address
          this.geocoder.addressSearch(data.address, (results)=>{
              var result = results[0]
              var coords = new kakao.maps.LatLng(result.y, result.x);
              this.place.latitude = result.y
              this.place.longitude = result.x
              // 지도 중심을 변경한다.
              this.map.setCenter(coords);
              // 마커를 결과값으로 받은 위치로 옮긴다.
              this.marker.setPosition(coords)
              
              
          })
        },
      }).open();
    },
    previewImage(evt) {
      this.place.img = evt.target.files[0];
      var input = evt.target;

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.previewImageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      } else {
          this.previewImageData = null;
      }
    }
  },


};
</script>

<style>
#map {
  width: 100%;
  height: 400px;
}

label{
  margin-bottom: 0;
}
</style>
