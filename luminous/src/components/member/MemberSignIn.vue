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
      <b-col cols="5">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="signInError === '중복된 아이디입니다.'">{{signInError}}</b-alert>
            <b-alert show variant="primary" v-else-if="signInError ===''" hidden>{{signInError}}</b-alert>
            <b-alert show variant="primary" v-else>{{signInError}}</b-alert>
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
  created() {
    this.temp()
  },
  methods: {
    ...mapActions(memberStore, ["userRegist", "registCheckId", "setSIGN_ERROR"]),
    
    temp(){
      this.setSIGN_ERROR();
      this.member.memberId = null;
      this.member.memberPassword = null;
      this.member.memberName = null
      this.member.birth = null;
    },
    async confirm() {
      this.setSIGN_ERROR();
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




