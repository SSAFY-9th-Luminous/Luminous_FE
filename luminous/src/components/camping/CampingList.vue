<template>
  <b-container class="bv-example-row mt-3">
    
    <b-row class="mb-1">
        <b-col>
        <b-form-select v-model="category" :options="options" @change="changeDetected"></b-form-select></b-col>
        <b-col></b-col>
        <b-col></b-col>
        <b-col></b-col>
        <b-col></b-col>
        <b-col class="text-right">
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table striped hover :items="campings" :fields="fields" @row-clicked="viewArticle">
          <template #cell(subject)="data">
            <router-link :to="{ name: 'campingView', params: { id: data.item.id  } }">
              {{ data.item.campingName }}
            </router-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { listCamping } from "@/api/camping";

export default {
  name: "CampingList",
  data() {
    return {
      campings: [],
      fields: [
        { key: "campingId", label: "캠핑장 번호", tdClass: "tdClass" },
        { key: "doName", label: "시/도 구분", tdClass: "tdClass" },
        { key: "campingName", label: "캠핑장 이름", tdClass: "tdSubject" },
        { key: "address", label: "주소", tdClass: "tdClass" }
      ],
      category:null,
      options: [
          { value: null, text: '지역' },
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
    let param = {
      address: null,
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
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 200px;
  text-align: center;
}
</style>