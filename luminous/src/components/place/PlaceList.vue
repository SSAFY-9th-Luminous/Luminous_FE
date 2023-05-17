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
        <b-button variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table striped hover :items="articles" :fields="fields" @row-clicked="viewArticle">
          <template #cell(subject)="data">
            <router-link :to="{ name: 'placeview', params: { articleno: data.item.articleno } }">
              {{ data.item.subject }}
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
      articles: [],
      fields: [
        { key: "articleno", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      category: null,
      options: [
          { value: null, text: '옵션' },
          { value: 'a', text: '제목' },
          { value: 'b', text: '작성자' },
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
        this.articles = data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "placewrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "placeview",
        params: { articleno: article.articleno },
      });
    },
    confirm(selected, text){
      console.log(selected)
      console.log(text)
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
