<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col></b-col>
        <b-col></b-col>
        <b-col></b-col>
        <b-col></b-col>
        <b-col>
        <b-form-select v-model="category" :options="options"></b-form-select></b-col>
        <b-col><b-form-input
                v-model="keyword"
                required
                placeholder="검색 내용"
                @keyup.enter="confirm"
              ></b-form-input></b-col>
        <b-col class="text-right">
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table striped hover :items="observatories" :fields="fields" @row-clicked="viewArticle">
          <template #cell(subject)="data">
            <router-link :to="{ name: 'observatoryView', params: { id: data.item.id  } }">
              {{ data.item.placeName }}
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
      category: null,
      options: [
          { value: null, text: '옵션' },
          { value: 'place', text: '제목' },
          { value: 'user', text: '작성자' },
          { value: 'desc', text: '설명' },
        ],
      keyword : "",
    };
  },
  created() {
    let param = {
      category: null,
      keyword: null,
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
    confirm(){
      
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
