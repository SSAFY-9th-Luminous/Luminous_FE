<template>
  <b-container class="bv-example-row mt-3">

    <h3 class="text-left">현재위치 근처 천문대</h3>

    <div class="bord"></div>

    <div id="slider-container">
      <vueper-slides id="slider" autoplay>
        <vueper-slide class="vueper-slide" v-for="(observatory, i) in locations" :key="i"
          :title="observatory.observatoryName" :content="observatory.address" :image="observatory.imageUrl"
          :style="`color: white`">
        </vueper-slide>
      </vueper-slides>
    </div>

    <h3 class="text-left mt-5">전국 천문대 목록</h3>

    <div class="bord"></div>

    <b-row class="mt-3 mb-3">
      <b-col class="offset-lg-10 col-lg-2">
        <b-form-select v-model="category" :options="options" @change="changeDetected"></b-form-select>
      </b-col>
    </b-row>
    


      <div>
        <!-- 메인 콘텐츠 -->
        <div v-for="observatory in observatories" :key="observatory.id" class="image-container">
          <div class="content-img-wrapper">
            <router-link :to="{ name: 'observatoryView', params: { id: observatory.id } }">
              <img class="content-img" v-if="observatory.imageUrl" :src="observatory.imageUrl"
                :alt="observatory.observatoryName">
              <img class="content-img" v-else :src="require('@/assets/img/star.png')">

              <div class="image-overlay">
                <h3>{{ observatory.observatoryName }}</h3>
                <p>{{ observatory.address }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
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
      category: null,
      options: [
        { value: null, text: '전체' },
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
      keyword: "",
    };
  },
  created() {

    getObservatoryListByLocation(
      ({ data }) => {
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
    replaceImg(e) {
      e.target.src = require(`@/assets/img/star.png`);

    },
    viewArticle(place) {
      this.$router.push({
        name: "observatoryView",
        params: { id: place.id },
      });
    },
    changeDetected() {
      let param = {
        address: this.category,
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

.vueperslide__title {
  font-size: 1.3em;
  color: white;
  text-align: left;
  background-color: #64646483;
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


/**/
.image-container {
  position: relative;
}

.content-img-wrapper {
  position: relative;
  display: inline-block;
}

.content-img {
  min-height: 300px;
  max-height: 300px;
  min-width: 700px;
  max-width: 700px;
  margin-bottom: 15px;
  border-radius: 15px;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  min-height: 50px;
  max-height: 80px;
  min-width: 300px;
  text-align: left;
  border-radius: 15px;
}

</style>