<template>
  <div>
    <b-row class="mb-1">
    <div id= "map"></div>    
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group hidden id="memberId-group" label="작성자:" label-for="memberId" description="작성자를 입력하세요.">
          <b-form-input 
            id="memberId"
            :disabled="isUserid"
            v-model=userInfo.memberId
            type="text"
            required
            placeholder="작성자 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="placeName-group" label="제목:" label-for="placeName" description="제목을 입력하세요.">
          <b-form-input
            id="placeName"
            v-model="place.placeName"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="placeDescription-group" label="내용:" label-for="placeDescription">
          <b-form-textarea
            id="placeDescription"
            v-model="place.placeDescription"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'register'">글작성</b-button>
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
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
        latitude: null,
        longitude: null,
        address: null,
        rate: 0.0,
        hit: 0,
      },
      isUserid: false,
      geocoder:null,
      latitude:0,
      longitude:0,
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  mounted() {
    kakao.maps.event.addListener(this.map, 'click', function(mouseEvent) {
                // 마커를 클릭한 위치에 표시합니다
                this.marker.setPosition(mouseEvent.latLng);
                this.marker.setMap(this.map);

                // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다

                
    });

  },
  created() {
    /* global kakao */
    if (!("geolocation" in navigator)) {
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log(1)
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
        console.log(2)
    })
    if (this.type === "modify") {
      let param = this.$route.params.id;
      getPlace(
        param,
        ({ data }) => {
          this.place = data.result;
          // console.log(this.place)
        },
        (error) => {
          console.log(error);
        }
      );
      this.isUserid = true;
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
      let param = {
        placeName: this.place.placeName,
        placeDescription: this.place.placeDescription,
        visitedDate: this.place.visitedDate,
        img: this.place.img,
        latitude: this.place.latitude,
        longitude: this.place.longitude,
        address: this.place.address,
        rate:this.place.rate,
        id : this.userInfo.id
      };
      console.log(param)
      writePlace(
        param,
        ({ data }) => {
          console.log(data)
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data.isSuccess === "success") {
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
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      })
      this.map = map
      this.geocoder = new kakao.maps.services.Geocoder();
      this.map.setMaxLevel(10)
       var marker = new kakao.maps.Marker({ 
                // 지도 중심좌표에 마커를 생성합니다 
                position: map.getCenter() 
            }); 
            // 지도에 마커를 표시합니다
            marker.setMap(this.map);

            kakao.maps.event.addListener(map, 'click', (mouseEvent)=> {
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);


              this.searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    let latlng = mouseEvent.latLng
                    // 마커를 클릭한 위치에 표시합니다
                    marker.setPosition(latlng);
                    marker.setMap(map);

                    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                    
                    console.log(latlng)
                    console.log(result[0].address.address_name)
                    
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
        img: this.place.img,
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
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 300px;
}
</style>
