<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col></b-col>
      <b-col>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="5">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-alert variant="primary" show style ="margin-bottom:30px"><br><h3>회원가입</h3></b-alert>
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
                  v-show="IdIsError"
                  class="input-error">
                  아이디를 입력해주세요
                </p>
                <p
                  v-show="IdCheckError"
                  class="input-error">
                  중복 체크해주세요
                </p>
                <p
                  v-show="idIsFine"
                  class="input-fine">
                  사용가능한 아이디입니다.
                </p>
              </div>
              <div class="col-sm-4">
                <b-button type="button" variant="primary" size="sm" id = "button3" @click="confirm">중복확인</b-button>
              </div>
            </div>
            <b-form-group label-for="memberPassword" label="비밀번호:">
              <b-form-input
                type="password"
                id="memberPassword"
                v-model="member.memberPassword"
                required
                placeholder="비밀번호"
                :class="{ 'input-danger': passwordHasError , 'shake' : passwordError}"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <p
              v-show="passwordHasError"
              class="input-error">
              영문,숫자,특수문자를 조합하여 입력해주세요.(8~16자)
            </p>
            <p
                  v-show="passwordIsError"
                  class="input-error">
                  비밀번호를 입력해주세요
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
            <p
                  v-show="nameIsError"
                  class="input-error">
                  이름을 입력해주세요
                </p>
            <b-form-group label-for="birth" label= "생일:" >
              <b-form-input
                type = "date"
                id="birth"
                v-model="member.birth"
                required
                placeholder="생일"
              ></b-form-input>
            </b-form-group>
            <p
                  v-show="birthIsError"
                  class="input-error">
                  생일을 입력해주세요
                </p>
      
            <b-button type="button" id = "button1" variant="primary" class="m-1" @click="[regist(), checkform()]">회원가입</b-button>
            <b-button type="button" id = "button2" variant="danger" class="m-1" @click="movePage">취소</b-button>
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
      IdIsError : false,
      idIsFine: false,
      passwordError:false,
      nameIsError:false,
      birthIsError:false,
      IdCheckError:false,
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
        this.IdCheckError = false;
        this.idIsError = false;
        this.idIsFine = true;
      }
    },
    checkform(){
      if(this.member.memberName === null){
        this.nameIsError = true
      }else{
        this.nameIsError = false;
      }
      if(this.member.birth === null){
        this.birthIsError = true
      }else{
        this.birthIsError = false;
      }
      if(this.member.memberId === null){
        this.IdIsError = true
      }else{
        this.IdIsError = false;
      }
      if(this.member.memberPassword === null){
        this.passwordIsError = true
      }else{
        this.passwordIsError = false;
      }

    },
     regist(){
      if(this.passwordHasError === true){
        if(this.nameIsError || this.birthIsError){
          this.passwordError = true;
          return

        }
      }
      if(this.signInError === ""){
        this.IdCheckError = true;
      }
      if(this.signInError ==="사용가능한 아이디입니다"){
        this.userRegist(this.member);
        this.$router.push({name:"login"})
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
        this.passwordError = false
    },
  }
};
</script>

<style scoped>
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
.card {
  padding : 0px 0px;
  position: relative;
  border-radius: 11px;
  box-shadow:0px 20px 20px -10px rgba(90, 95, 173, 0.644);
}
#button1{
  align-content: center;
  position: relative;
  left:25%;
  background-color: #1a1c8fa9;
  border-color: transparent;
}
#button1:hover{
  background-color: #1a1c8fc0;
}
#button2{
  align-content: center;
  position: relative;
  left:25%;
  border-color: transparent;
  background-color: #1a5a8fa9;
}
#button2:hover{
  background-color: #1a5a8fe7;
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
#button3{
  margin-top :32px;
  background-color: #1a3f8fa9;
  border-color: transparent;
}
#button3:hover{
  background-color: #1a2f8fc0;
}
</style>




