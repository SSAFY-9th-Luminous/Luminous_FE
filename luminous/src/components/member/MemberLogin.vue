<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col></b-col>
      <b-col>
        <b-alert variant="secondary" show><h3>로그인</h3></b-alert>
      </b-col>
            <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="5">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError">아이디 또는 비밀번호를 확인하세요.</b-alert>
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
            <b-form-group>
              <b-form-checkbox v-model = "saveStatus" value = "true" unchecked-value="false">
                아이디 저장

              </b-form-checkbox>
            </b-form-group>
            <div class = "mx-auto">
            <b-button type="button" variant="primary" class="m-1" id="button1" @click="confirm">로그인</b-button>
            <b-button type="button" variant="success" class="m-1" id="button2" @click="movePage">회원가입</b-button>
            </div>
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

  name: "MemberLogin",
  data() {
    return {
      member: {
        memberId: this.$cookies.get("idCookie"),
        memberPassword: null,
      },
      saveStatus:false,
    };
  },
  created() {
    this.reset();
  },

  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
    
  },

  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo", "resetLOGIN_ERROR"]),
    reset(){
      this.resetLOGIN_ERROR();
    },
    async confirm() {
     
      await this.userConfirm(this.member).catch();
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        if(this.saveStatus){
          this.$cookies.set("idCookie", this.member.memberId);
        }else if(!this.saveStatus){
          this.$cookies.remove("idCookie");
        }
        await this.getUserInfo(token);
        this.$router.push({ name: "main" });
      }

    },
    movePage() {
      this.$router.push({ name: "signin" });
    },
  },
};
</script>

<style scoped>

#button1{
  align-content: center;
  position: relative;
  left:25%
  
}
#button2{
  align-content: center;
  position: relative;
  left:25%
  
}


#button1:hover{
  outline:2px solid black;
  background-color:red;
}
.card {
  padding : 10px 10px;
  position: relative;
  border-radius: 11px;
}
.card::after {
  position: absolute;
  content: "";
  background: linear-gradient(135deg,#9d71bb, #5a70b2, #9d71bb,#5a70b2,#9d71bb);
  background-size: 200% 200%;
  height: 105%;
  width: 105%;
  display: flex;
  z-index: -1;
  filter: blur(30px);
  animation: neon 0.6s linear infinite;
}
@keyframes neon {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}

</style>
