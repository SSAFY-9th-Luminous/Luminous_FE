<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col><b-alert show variant="danger">삭제중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { deletePlace } from "@/api/place";

export default {
  name: "PlaceDelete",
  created() {
    let param = this.$route.params.id;
    deletePlace(
      param,
      ({ data }) => {
        let msg = "삭제 처리시 문제가 발생했습니다.";
        if (data.isSuccess === true) {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);
        this.$router.push({ name: "placelist" });
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style></style>
