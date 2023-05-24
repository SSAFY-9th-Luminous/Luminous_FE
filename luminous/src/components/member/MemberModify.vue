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
                <b-form-input id = "id" v-model = member.id hidden readonly></b-form-input>
                <b-form-group label-for="memberId" label="아이디:">
                  <b-form-input id = "memberId" v-model = member.memberId readonly></b-form-input>
                </b-form-group>
              </div>
            </div>
            <b-form-group label-for="memberPassword" label="비밀번호:">
              <b-form-input
                type="password"
                id="memberPassword"
                v-model="member.memberPassword"
                required
                placeholder="비밀번호"
                :class="{ 'input-danger': passwordHasError , 'shake': signInError }"
                
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <p
              v-show="passwordHasError"
              class="input-error">
              영문,숫자,특수문자를 조합하여 입력해주세요.(8~16자)
            </p>
            <b-form-group label-for="memberName" label="이름:">
              <b-form-input
                id="memberName"
                v-model="member.memberName"
                required
                placeholder="이름"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label-for="birth" label="생일:">
              <b-form-input
                type = "date"
                id="birth"
                v-model="member.birth"
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
      member: {
        id: null,
        memberId: null,
        memberPassword: null,
        memberName:null,
        birth : null,
      },
      passwordHasError: false,
      idIsError : false,
      idIsFine: false,
      signInError:false,
    };
  },
  watch:{
    'member.memberPassword' : function(){
      this.checkPassword()
    },
    
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.temp()
    
  },
  methods: {
    ...mapActions(memberStore, ["userModify","getUserInfo"]),
    temp(){
      this.member.id = this.userInfo.id;
      this.member.memberId = this.userInfo.memberId;
      this.member.memberPassword = null;
      this.member.memberName = this.userInfo.memberName
      this.member.birth = this.userInfo.birth;
    },
    async modify(){
      if(this.passwordHasError === true){
        this.signInError = true;
        return
      }else{
        this.signInError = false;
      }
      if(!this.signInError){
        await this.userModify(this.member);
        this.$router.push({name:"main"});
        await this.getUserInfo(sessionStorage.getItem('access-token'));
      }
    },
    
    movePage() {
      this.$router.push({ name: "mypage" });
    },

    checkPassword() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
      if (!validatePassword.test(this.member.memberPassword) || !this.member.memberPassword) {
        this.passwordHasError = true
        return
      } 
        this.passwordHasError = false
        this.signInError = false
    },
    
  },
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


.shake{
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.5s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.shake:focus{
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: none;

  /* When the animation is finished, start again */
}
</style>




