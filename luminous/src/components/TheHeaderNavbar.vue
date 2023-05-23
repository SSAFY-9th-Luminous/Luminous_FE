<template>
  <div>
    
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-container>
      <b-navbar-brand href="#">
        <router-link :to="{ name: 'main' }">
          <div class = "hello">
          <b-img
            :src="require('@/assets/img/luminous.png')"
            id="logo"
            class="d-inline-block align-top"
            alt="logo"
          ></b-img>
          </div>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" style="display:inline-block">
            <router-link :to="{ name: 'fortunelist' }" class="link newcolor">
              <b-icon icon="star" animation="fade" ></b-icon>
              별자리
            </router-link>
            <router-link :to="{ name: 'observatorylist' }" class="m-2 link newcolor">
              <b-icon icon="moon" animation="fade" ></b-icon>
              천문대
            </router-link>
            <router-link :to="{ name: 'map' }" class="m-2 link newcolor">
              <b-icon icon="map" animation="fade" />
              지도
            </router-link>
            <router-link :to="{ name: 'placelist' }" class="m-2 link newcolor">
              <b-icon icon="clipboard" animation="fade" />
              게시판
            </router-link>
        
        <b-nav-item-dropdown right v-if="userInfo" class="custom-dropdown" style="display:inline-block">
            <template #button-content>
              <img src="@/assets/star.png" id = "img1"/>
            </template>
            <b-dropdown-item href="#" @click="onClickLogout">
              <a href="#"  class = "aa" style="text-decoration: none">로그아웃</a>
            </b-dropdown-item>
            <b-dropdown-item href="#" :to="{name: 'mypage'}">
              <a href="#"  class = "aa" style="text-decoration: none">마이페이지</a>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        <router-link :to="{ name: 'login' }" class="link m-2 newcolor"  style="display:inline-block" font-scale = "2" v-else>
           <b-icon icon="key" animation="fade" font-scale="1.5" class = "mt-2"></b-icon>
           로그인
        </router-link>
          </b-nav-item>
          
          
        </b-navbar-nav>
      </b-collapse>
      </b-container>
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
    goToPage(url){
      this.$router.push({name: `${url}`});
    }
    ,

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


.link:hover{
  font-weight: 800;
  filter: drop-shadow(0 0 0.75rem #fffb00); 
}
#img1{
  width:40px;
}
.newcolor{
  color:aliceblue;
}
a.router-link-exact-active {
  color: #efe589;
  font-weight : 100;
  filter: drop-shadow(0 0 0.5rem #d0ff00); 
}

a.router-link-exact-active:hover {
  /* text-decoration: none; */
  animation : none;
  color: white;
  
  font-weight : 800;
}

.aa:hover{
  font-weight : 800;
}

.aa{
  color:rgb(49, 49, 49);
}

.aa.router-link-exact-active{
  color: blue;
}

.aa.router-link-exact-active:hover{
  color: navy;
}

.hello:hover {
  
  filter: drop-shadow(0 -5px 1rem #fffb00); 
}


</style>
