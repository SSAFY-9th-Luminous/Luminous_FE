<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col></b-col>
      <b-col>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col></b-col>
      <b-col cols="6">
        <b-jumbotron>
          <b-alert variant="primary" show style ="margin-bottom:30px"><h3>마이페이지</h3></b-alert>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디</b-col>
              <b-col cols="4" align-self="start">{{ userInfo.memberId }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.memberName }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">생일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.birth }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">별자리</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.constellation12Name }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button variant="primary" id = "button1" @click = modifyInfo class="mr-1">정보수정</b-button>
          <b-button variant="danger" id = "button2" @click = withdraw>회원탈퇴</b-button>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberMyPage",
  components: {
    
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  
  methods: {
    ...mapActions(memberStore, ["userWithdraw"]),
    modifyInfo(){
      this.$router.push({name:"memberModify"});
    },
    withdraw() {
      let token = sessionStorage.getItem("access-token");
      if(confirm("회원 탈퇴하시겠습니까?"))
      {
        if(confirm("정말로 탈퇴하시겠습니까?")){
          
          this.userWithdraw(token);
          this.$router.push({ name: "main" });
        }
      }

    },
  },
};
</script>

<style scoped>
#button1{
  align-content: center;
  position: relative;
  background-color: #1a1c8fa9;
  border-color: transparent;
}
#button1:hover{
  background-color: #1a1c8fc0;
}
.jumbotron {
  border-radius: 11px;
  box-shadow:0px 20px 20px -10px rgba(90, 95, 173, 0.644);
}
#button2{
  align-content: center;
  position: relative;
  border-color: transparent;
  background-color: #1a5a8fa9;
}
#button2:hover{
  background-color: #1a5a8fe7;
}</style>
