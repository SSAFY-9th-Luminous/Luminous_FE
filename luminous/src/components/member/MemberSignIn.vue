<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col></b-col>
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col>
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="signInError">아이디 또는 비밀번호를 확인하세요.</b-alert>
            <b-form-group label="아이디:" label-for="memberId">
              <b-form-input
                id="memberId"
                v-model="member.memberId"
                required
                placeholder="아이디 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="memberPassword">
              <b-form-input
                type="password"
                id="memberPassword"
                v-model="member.memberPassword"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이름:" label-for="memberName">
              <b-form-input
                id="memberName"
                v-model="member.memberName"
                required
                placeholder="이름 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
           
            <b-form-group label="생일:" label-for="birth">
              <b-form-input
                id="birth"
                v-model="member.birth"
                required
                placeholder="생일 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            
      
            <b-button type="button" variant="primary" class="m-1" @click="confirm">회원가입</b-button>
            <b-button type="button" variant="danger" class="m-1" @click="movePage">취소</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";
export default {
  name: "MemberSignIn",
  data() {
    return {
      member: {
        memberId: null,
        memberPassword: null,
        memberName:null,
        birth : null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["signInError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userRegist"]),
    async confirm() {
      await this.userRegist(this.member).catch();
      if(!this.signInError){
        this.$router.push({name:"main"})
      }
    },
    movePage() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
</style>




