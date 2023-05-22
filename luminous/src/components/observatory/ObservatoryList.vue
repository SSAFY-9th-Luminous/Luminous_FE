<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
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
import { listObservatory } from "@/api/observatory";

export default {
  name: "ObservatoryList",
  data() {
    return {
      observatories: [],
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
    let param = {
      address: null,
    };
    listObservatory(
      param,
      ({ data }) => {
        this.observatories = data.result;
        
        console.log(this.observatories)
      },
      (error) => {
        console.log(error);
      }
    );
  },
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
        
          console.log(this.observatories)
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
  width: 300px;
  text-align: left;
}
</style>
