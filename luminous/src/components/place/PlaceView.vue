<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="userInfo.memberId === place.member.memberId">
        <b-button variant="outline-info" size="sm" @click="moveModifyPlace" class="mr-2">글수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deletePlace">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${place.id}.
          ${place.placeName} [${place.hit}]</h3><div><h6>${place.member.memberId}</div><div>${place.createdDate}</h6></div><div>${place.lastModifiedDate}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div>{{place.placeDescription}}</div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import { getPlace } from "@/api/place";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "PlaceView",
  data() {
    return {
      place: {
        member:{
          memberId:null
        },

      },
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.place.content) return this.place.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    let param = this.$route.params.id;
    console.log(param)
    getPlace(
      param,
      ({ data }) => {
        console.log(data)
        this.place = data.result;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveModifyPlace() {
      this.$router.replace({
        name: "placemodify",
        params: { id: this.place.id },
      });
    },
    deletePlace() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.$router.replace({
          name: "placedelete",
          params: { id: this.place.id },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "placelist" });
    },
  },
};
</script>

<style></style>
