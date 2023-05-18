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
            <div class="row">
  <div class="col-sm-8">
    <b-form-group label-for="memberId">
      <b-form-input
        id="memberId"
        v-model="member.memberId"
        required
        placeholder="ID"
        @keyup.enter="confirm"
      ></b-form-input>
    </b-form-group>
  </div>
  <div class="col-sm-4">
    <b-button type="button" variant="primary" size="sm" class = "mt-1" @click="confirm">중복확인</b-button>
  </div>
</div>
            <b-form-group label-for="memberPassword">
              <b-form-input
                type="password"
                id="memberPassword"
                v-model="member.memberPassword"
                required
                placeholder="비밀번호"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label-for="memberName">
              <b-form-input
                id="memberName"
                v-model="member.memberName"
                required
                placeholder="이름"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
           
            <b-form-group label-for="birth">
              <b-form-input
                type = "date"
                id="birth"
                v-model="member.birth"
                required
                placeholder="생일"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            
      
            <b-button type="button" variant="primary" class="m-1" @click="regist">회원가입</b-button>
            <b-button type="button" variant="danger" class="m-1" @click="temp">다시하기</b-button>
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
    ...mapActions(memberStore, ["userRegist", "registCheckId", "setSIGN_ERROR"]),
    temp(){
      this.setSIGN_ERROR();
      console.log(1)
    },
    async confirm() {
      this.temp();
      await this.registCheckId(this.member.memberId).catch()
    },
    async regist(){
      if(!this.signInError){
        await this.userRegist(this.member);
        this.$router.push({name:"main"})
      }
      else{
        alert("중복된 아이디")
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




