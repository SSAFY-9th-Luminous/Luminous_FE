<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
        <b-col>
        <b-form-select v-model="category" :options="options"></b-form-select></b-col>
        <b-col><b-form-input
                v-model="keyword"
                required
                placeholder="검색 내용"
                @keyup.enter="confirm"
              ></b-form-input></b-col>
        <b-col></b-col>
        <b-col></b-col>
        <b-col></b-col>
        <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table striped hover :items="places" :fields="fields" @row-clicked="viewArticle">
          <template #cell(subject)="data">
            <router-link :to="{ name: 'placeview', params: { id: data.item.id  } }">
              {{ data.item.placeName }}
            </router-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { listPlace } from "@/api/place";

export default {
  name: "PlaceList",
  data() {
    return {
      places: [],
      fields: [
      { key: "id", label: "글번호", tdClass: "tdClass" },
        { key: "placeName", label: "제목", tdClass: "tdSubject" },
        { key: "member.memberName", label: "작성자", tdClass: "tdClass" },
        { key: "createdDate", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      category: null,
      options: [
          { value: null, text: '옵션' },
          { value: 'place', text: '제목' },
          { value: 'user', text: '작성자' },
          { value: 'desc', text: '내용' },
        ],
      keyword : "",
    };
  },
  created() {
    let param = {
      category: null,
      keyword: null,
    };
    listPlace(
      param,
      ({ data }) => {
        this.places = data.result;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "placewrite"});
    },
    viewArticle(place) {
      this.$router.push({
        name: "placeview",
        params: { id: place.id },
      });
    },
    confirm(){
      let param = {
      category: this.category,
      keyword: this.keyword,
    };
    listPlace(
      param,
      ({ data }) => {
        this.places = data.result;
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
  text-align: left;
}
</style>