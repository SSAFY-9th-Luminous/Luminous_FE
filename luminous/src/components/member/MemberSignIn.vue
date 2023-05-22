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
            <div class="row">
              <div class="col-sm-8">
                <b-form-group label-for="memberId" label = "아이디:">
                  <b-form-input
                    id="memberId"
                    v-model="member.memberId"
                    required
                    placeholder="ID"
                    @keyup.enter="confirm"
                  ></b-form-input>
                </b-form-group>
                <p
                  v-show="idIsError"
                  class="input-error">
                  중복된 아이디입니다.
                </p>
                <p
                  v-show="idIsFine"
                  class="input-fine">
                  사용가능한 아이디입니다.
                </p>
              </div>
              <div class="col-sm-4">
                <b-button type="button" variant="primary" size="sm" class = "mt-1" @click="confirm">중복확인</b-button>
              </div>
            </div>
            <b-form-group label-for="memberPassword" label="비밀번호:">
              <b-form-input
                type="password"
                id="memberPassword"
                v-model="member.memberPassword"
                required
                placeholder="비밀번호"
                :class="{ 'input-danger': passwordHasError }"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <p
              v-show="passwordHasError"
              class="input-error">
              영문,숫자,특수문자를 조합하여 입력해주세요.(8~16자)
            </p>
            <b-form-group label-for="memberName" label = "이름:">
              <b-form-input
                id="memberName"
                v-model="member.memberName"
                required
                placeholder="이름"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
           
            <b-form-group label-for="birth" label= "생일:">
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
      
      passwordHasError: false,
      idIsError : false,
      idIsFine: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["signInError"]),
  },
  created() {
    this.temp()
  },
  watch:{
    'member.memberPassword' : function(){
      this.checkPassword()
    }
  },
  methods: {
    ...mapActions(memberStore, ["userRegist", "registCheckId", "setSIGN_ERROR"]),
    
    temp(){
      this.setSIGN_ERROR("");
      this.member.memberId = null;
      this.member.memberPassword = null;
      this.member.memberName = null
      this.member.birth = null;
    },
    async confirm() {
      
      this.setSIGN_ERROR();
      await this.registCheckId(this.member.memberId).catch()
      if(this.signInError === "중복된 아이디입니다."){
        this.idIsFine = false;
        this.idIsError = true;
      
      }else{
        this.idIsError = false;
        this.idIsFine = true;
      }
    },
    async regist(){
      if(this.passwordHasError === true){
        return
      }
      if(this.signInError ==="사용가능한 아이디입니다"){
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
    checkPassword() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
      if (!validatePassword.test(this.member.memberPassword) || !this.member.memberPassword) {
        this.passwordHasError = true
        return
      } 
        this.passwordHasError = false
    },
  }
};
</script>

<style>
.input-error {
    line-height: 16px;
    font-size: 11px;
    color: red;
  }
.input-fine{
  line-height: 16px;
    font-size: 11px;
    color: blue;
}
</style>




