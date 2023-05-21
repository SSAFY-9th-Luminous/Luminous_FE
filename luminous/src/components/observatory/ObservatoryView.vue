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
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${observatory.id}.
          ${observatory.observatoryName}</h3><div><h6>${observatory.id}</div><div>${observatory.siDoName}</h6></div><div>${observatory.address}</h6></div>`"
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
import { getObservatory } from "@/api/observatory";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "ObservatoryView",
  data() {
    return {
      observatory,
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
    getObservatory(
      param,
      ({ data }) => {
        console.log(data)
        this.observatory = data.result;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveList() {
      this.$router.push({ name: "observatorylist" });
    },
  },
};
</script>

<style></style>
