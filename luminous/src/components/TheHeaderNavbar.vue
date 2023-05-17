<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">
        <router-link :to="{ name: 'main' }">
          <b-img
            :src="require('@/assets/star.png')"
            id="logo"
            class="d-inline-block align-top"
            alt="logo"
          ></b-img>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">
            <router-link :to="{ name: 'constellation' }" class="link">
              <b-icon icon="star" animation="fade" font-scale="2"></b-icon>
              별자리
            </router-link>
            <router-link :to="{ path: 'observatory' }" class="m-2 link">
              <b-icon icon="moon" animation="fade" font-scale="2"></b-icon>
              천문대
            </router-link>
            <router-link :to="{ name: 'main' }" class="m-2 link">
              <b-icon icon="map" animation="fade" font-scale="2"/>
              마이플레이스
            </router-link>
            <router-link :to="{ name: 'place' }" class="m-2 link">
              <b-icon icon="clipboard" animation="fade" font-scale="2"/>
              게시판
            </router-link>
            
          </b-nav-item>

        <b-nav-item-dropdown right v-if="userInfo">
            <template #button-content>
              <img src="@/assets/star.png" id = "img1"/>
            </template>
            <b-dropdown-item href="#">
              <a href="#" @click="onClickLogout">로그아웃</a>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link :to="{ name: 'mypage' }" class="link">
                마이페이지
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        <router-link :to="{ name: 'login' }" class="link m-2" font-scale = "2" v-else>
           <b-icon icon="key" animation="fade" font-scale="1.5" class = "mt-2"></b-icon>
           로그인
        </router-link>
          
          
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "TheHeaderNavbar",
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout", "setIsLoginError"]),
    temp(){
      this.setIsLoginError();
    },
    onClickLogout() {
      console.log(this.userInfo.id);
      this.userLogout();
      console.log("logout")
      if (this.$route.path != "/")this.$router.push({ name: "main" });
    },
  },
};
</script>

<style scoped>
#logo {
  width: 120px;
}

.link {
  text-decoration: none;
}
#img1{
  width:40px;
}
</style>
