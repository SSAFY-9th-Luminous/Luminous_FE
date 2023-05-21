<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="memberId-group" label="작성자:" label-for="memberId" description="작성자를 입력하세요.">
          <b-form-input
            id="memberId"
            :disabled="isUserid"
            v-model="place.member.memberId"
            type="text"
            required
            placeholder="작성자 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="placeName-group" label="제목:" label-for="placeName" description="제목을 입력하세요.">
          <b-form-input
            id="placeName"
            v-model="place.placeName"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="placeDescription-group" label="내용:" label-for="placeDescription">
          <b-form-textarea
            id="placeDescription"
            v-model="place.placeDescription"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'register'">글작성</b-button>
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { writePlace, modifyPlace, getPlace } from "@/api/place";

export default {
  name: "PlaceInputItem",
  data() {
    return {
      place: {
        id: 0,
        memberId: "",
        placeName: "",
        placeDescription: "",
        visitedDate: null,
        img: null,
        latitude: null,
        longitude: null,
        address: null,
        rate: 0.0,
        hit: 0,
      },
      isUserid: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      let param = this.$route.params.id;
      getPlace(
        param,
        ({ data }) => {
          this.place = data.result;
          console.log(this.place)
        },
        (error) => {
          console.log(error);
        }
      );
      this.isUserid = true;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      let err = true;
      let msg = "";
      err && !this.place.placeName && ((msg = "제목 입력해주세요"), (err = false), this.$refs.placeName.focus());
      err && !this.place.placeDescription && ((msg = "내용 입력해주세요"), (err = false), this.$refs.placeDescription.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registplace() : this.modifyPlace();
    },
    onReset(event) {
      event.preventDefault();
      this.place.placeName = "";
      this.place.placeDescription = "";
      this.moveList();
    },
    registplace() {
      let param = {
        memberId: this.place.memberId,
        subject: this.place.subject,
        content: this.place.content,
      };
      writePlace(
        param,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    modifyPlace() {
      let param = {
        placeName: this.place.placeName,
        placeDescription: this.place.placeDescription,
        visitedDate: this.place.visitedDate,
        img: this.place.img,
        latitude: this.place.latitude,
        longitude: this.place.longitude,
        address: this.place.address,
        rate:this.place.rate,
      };
      modifyPlace(
        param,
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data.isSuccess === true) {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "placelist" });
    },
  },
};
</script>

<style></style>
