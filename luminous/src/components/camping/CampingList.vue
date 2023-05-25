<template>
  <b-container class="bv-example-row mt-3">
    
    
    <h3 class="text-left">현재위치 근처 캠핑장</h3>

    <div class="bord"></div>

    <div id="slider-container">
      <vueper-slides id="slider" autoplay>
        <vueper-slide
          class="vueper-slide"
          v-for="(camping, i) in locations"
          :key="i"
          :title="camping.campingName"
          :content="camping.address"
          :image="camping.imageUrl"
          :style="`color: white`">
        </vueper-slide>
      </vueper-slides>
    </div>



    <h3 class="text-left mt-5">전국 캠핑장 목록</h3>

    <div class="bord"></div>
    
    <b-row class="mt-3 mb-3">
        <b-col class="col-lg-2">
          <b-form-select  v-model="category" :options="options" @change="changeDetected"></b-form-select>
        </b-col>
    </b-row>

    <div>
        <!-- 메인 콘텐츠 -->
        <div v-for="camping in campings" :key="camping.id" class="image-container">
          <div class="content-img-wrapper">
            <router-link :to="{ name: 'campingView', params: { id: camping.id } }">
              <img class="content-img-title" v-if="camping.imageUrl" :src="camping.imageUrl"
                :alt="camping.campingName">
              <img class="content-img-title" v-else :src="require('@/assets/img/star.png')">

              <div class="image-overlay-title">
                <h3>{{ camping.campingName }}</h3>
                <p>{{ camping.address }}</p>
              </div>
              
              <div v-if="camping.lineIntro" class="image-overlay-lineIntro">
                {{ camping.lineIntro }}
              </div>
              <div class="image-overlay-rate">
                <p>⭐별점 ({{ camping.rate }})</p>
                <p>😊추천인원 ({{ camping.count }})</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
  </b-container>

    <!-- <b-row>
      <b-col>
        <b-table striped hover :items="campings" :fields="fields" @row-clicked="viewArticle">
          <template #cell(subject)="data">
            <router-link :to="{ name: 'campingView', params: { id: data.item.id  } }">
              {{ data.item.campingName }}
            </router-link>
          </template>
        </b-table>
      </b-col>
    </b-row> -->
</template>

<script>
import { listCamping, getCampingListByLocation } from "@/api/camping";
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: "CampingList",
  data() {
    return {
      campings: [],
      locations: [],
      fields: [
        { key: "campingId", label: "캠핑장 번호", tdClass: "tdClass" },
        { key: "doName", label: "시/도 구분", tdClass: "tdClass" },
        { key: "campingName", label: "캠핑장 이름", tdClass: "tdSubject" },
        { key: "address", label: "주소", tdClass: "tdClass" }
      ],
      category: null,
      options: [
          { value: null, text: '전체'},
          { value: '서울시', text: '서울' },
          { value: '경기도', text: '경기도' },
          { value: '강원도', text: '강원도' },
          { value: '충청북도', text: '충청북도' },
          { value: '충청남도', text: '충청남도' },
          { value: '경상북도', text: '경상북도' },
          { value: '경상남도', text: '경상남도' },
          { value: '전라북도', text: '전라북도' },
          { value: '전라남도', text: '전라남도' },
          { value: '광주시', text: '광주광역시' },
          { value: '울산시', text: '울산광역시' },
          { value: '부산시', text: '부산광역시' },
          { value: '대전시', text: '대전광역시' },
          { value: '제주도', text: '제주특별자치도' },
        ],
      keyword : "",
    };
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let location = {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
          }
          
          getCampingListByLocation(
            location,
            ({data}) => {
              this.locations = data.result;
              console.log(this.locations)
            }
          )

        },
        (error) => {
          console.error('위치 정보를 가져오는 데 실패했습니다:', error);
        }
      );
    } else {
      console.error('Geolocation이 지원되지 않는 브라우저입니다.');
    }


    let param = {
      address: null,
    };
    listCamping(
      param,
      ({ data }) => {
        this.campings = data.result;
        console.log(data)
      },
      (error) => {
        console.log(error);
      }
    );
  },
  components: { VueperSlides, VueperSlide },
  methods: {
    viewArticle(place) {
      this.$router.push({
        name: "campingView",
        params: { id: place.id },
      });
    },
    changeDetected(){
      let param = {
        region : this.category,
      };
      listCamping(
        param,
        ({ data }) => {
          this.campings = data.result;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scope>

.bord {
  height: 2px;
  width: 100%;
  background-color: rgb(143 143 143);
  margin-top: 20px;
  margin-bottom: 20px;
}

.vueperslide__title{
  font-size: 1.3em; 
  color: white; 
  text-align:left;
  background-color:#64646483;
}

.vueperslide__content-wrapper:not(.vueperslide__content-wrapper--outside-top):not(.vueperslide__content-wrapper--outside-bottom) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
}
/* 
.vueperslide__content-wrapper {
  background-color: #dadada75;
} */

.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 200px;
  text-align: center;
}
.image-container {
  position: relative;
}

.content-img-wrapper {
  position: relative;
  display: inline-block;
  font-family: AppleSDGothicNeoR;
}

.content-img-title {
  min-height: 300px;
  max-height: 300px;
  min-width: 700px;
  max-width: 700px;
  margin-bottom: 15px;
  border-radius: 15px;
}

.image-overlay-title {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  min-height: 50px;
  max-height: 80px;
  min-width: 300px;
  max-width: 600px;
  text-align: left;
  border-radius: 15px;
  font-weight: bold;
}

.image-overlay-rate {
  position: absolute;
  bottom: 15px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  min-height: 50px;
  max-height: 80px;
  min-width: 100px;
  text-align: center;
  border-radius: 15px;
  border-top-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.image-overlay-lineIntro {
  position: absolute;
  margin-bottom: 25px;
  bottom: 15px;
  left: 0;
  background-color: rgba(255, 188, 3, 0.733);
  color: rgb(253, 253, 253);
  padding: 5px;
  min-height: 25px;
  max-height: 30px;
  min-width: 200px;
  max-width: 400px;
  text-align: left;
  font-size: normal;
}
</style>