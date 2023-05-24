<template>
  <b-container class="bv-example-row mt-3">

    <h3 class="text-left">현재위치 근처 천문대</h3>

    <div class="bord"></div>

    <div id="slider-container">
      <vueper-slides id="slider" autoplay>
        <vueper-slide
          class="vueper-slide"
          v-for="(observatory, i) in locations"
          :key="i"
          :title="observatory.observatoryName"
          :content="observatory.address"
          :image="observatory.imageUrl"
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

    <b-row>
      <b-col>
        <b-table striped hover :items="observatories" :fields="fields" @row-clicked="viewArticle">
          <template #cell(subject)="data">
            <router-link :to="{ name: 'observatoryView', params: { id: data.item.id  } }">
              {{ data.item.observatoryName }}
            </router-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { listObservatory, getObservatoryListByLocation } from "@/api/observatory";
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: "ObservatoryList",
  data() {
    return {
      observatories: [],
      locations: [],
      fields: [
        { key: "id", label: "천문대 번호", tdClass: "tdClass" },
        { key: "siDoName", label: "시/도 구분", tdClass: "tdClass" },
        { key: "observatoryName", label: "천문대 이름", tdClass: "tdSubject" },
        { key: "address", label: "주소", tdClass: "tdClass" },
      ],
      category:null,
      options: [
          { value: null, text: '지역' },
          { value: '서울특별', text: '서울' },
          { value: '경기도 ', text: '경기도' },
          { value: '강원도 ', text: '강원도' },
          { value: '충청북도', text: '충청북도' },
          { value: '충청남도 ', text: '충청남도' },
          { value: '경상북도', text: '경상북도' },
          { value: '경상남도 ', text: '경상남도' },
          { value: '전라북도', text: '전라북도' },
          { value: '전라남도 ', text: '전라남도' },
          { value: '광주광역', text: '광주광역시' },
          { value: '울산광역', text: '울산광역시' },
          { value: '부산광역 ', text: '부산광역시' },
          { value: '대전광역', text: '대전광역시' },
          { value: '제주특별', text: '제주특별자치도' },
        ],
      keyword : "",
    };
  },
  created() {
    
    getObservatoryListByLocation(
      ({data}) => {
        this.locations = data.result;
        console.log(this.locations)
      }
    )

    let param = {
      address: null,
    };
    listObservatory(
      param,
      ({ data }) => {
        this.observatories = data.result;
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
        name: "observatoryView",
        params: { id: place.id },
      });
    },
    changeDetected(){
      let param = {
        address : this.category,
      };
      listObservatory(
        param,
        ({ data }) => {
          this.observatories = data.result;
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

/* vueper slide 시작 */
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

/* vueper slide 끝 */

.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 200px;
  text-align: center;
}
</style>