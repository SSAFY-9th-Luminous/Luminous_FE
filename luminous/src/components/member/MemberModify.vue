<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col></b-col>
      <b-col>
        <b-alert variant="secondary" show><h3>회원정보 수정</h3></b-alert>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="5">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <div class="row">
              <div class="col-sm-8">
                <b-form-input id = "id" v-model = userInfo.id readonly></b-form-input>
                <b-form-group label-for="memberId" label="아이디:">
                  <b-form-input id = "memberId" v-model = userInfo.memberId readonly></b-form-input>
                </b-form-group>
              </div>
            </div>
            <b-form-group label-for="memberPassword" label="비밀번호:">
              <b-form-input
                type="password"
                id="memberPassword"
                v-model="userInfo.memberPassword"
                required
                placeholder="비밀번호"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label-for="memberName" label="이름:">
              <b-form-input
                id="memberName"
                v-model="userInfo.memberName"
                required
                placeholder="이름"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label-for="birth" label="생일:">
              <b-form-input
                type = "date"
                id="birth"
                v-model="userInfo.birth"
                required
                placeholder="생일"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            
            <b-button type="button" variant="primary" class="m-1" @click="modify">수정</b-button>
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
  name: "MemberModify",
  data() {
    return {
        
      
    };
  },
  
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.temp()
  },
  methods: {
    ...mapActions(memberStore, ["userModify","getUserInfo"]),
    
    async modify(){
      if(!this.signInError){
        await this.userModify(this.userInfo);
        this.$router.push({name:"main"});
        await this.getUserInfo(sessionStorage.getItem('access-token'));
      }
    },
    
    movePage() {
      this.$router.push({ name: "mypage" });
    },
  },
};
</script>

<style>
</style>




