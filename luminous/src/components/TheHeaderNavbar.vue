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
            <router-link :to="{ name: 'constellationlist' }" class="link newcolor">
              <b-icon icon="star" animation="fade" ></b-icon>
              별자리
            </router-link>
            <router-link :to="{ name: 'fortunelist' }" class="m-2 link newcolor">
              <b-icon icon="moon" animation="fade" ></b-icon>
              오늘의 운세
            </router-link>
            <router-link :to="{ name: 'observatorylist' }" class="m-2 link newcolor">
              <b-icon icon="stars" animation="fade" ></b-icon>
              천문대
            </router-link>
            <router-link :to="{ name: 'campinglist' }" id="link" class="m-2 link newcolor">
            <b-icon icon="tree" animation="fade"></b-icon>캠핑장
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
              <b-avatar button variant="secondary"></b-avatar>
              <!-- <b-avatar button variant="secondary" :text="userInfo.memberName" :src="require('@/assets/img/constellation12/' + userInfo.constellation12Img)" ></b-avatar> -->
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
    <div id="category-container" class="mb-5">
      <div class = "yes first" >
        <div class = "yes" style = "margin-left:1%" v-for="(weather, i) in todaySkys" :key="i">
        {{weather.city}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
        <img :src="require('@/assets/img/weather/'+weather.fcstValue+'.png')" height="15px" width="18px" style:>
        </div>
      </div>
      <div id = "tomorrow" class = "yes second">
        <div class = "yes" style = "margin-left: 1%" v-for="(weather1, i) in tomorrowSkys" :key="i">
        {{weather1.city}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
        <img :src="require('@/assets/img/weather/'+weather1.fcstValue+'.png')" height="15px" width="18px">
      


        </div>
      </div>
      <div class = "yes third" >
        <div class = "yes" style = "margin-left:1%" v-for="(weather, i) in todayTmps" :key="i">
        {{weather.fcstValue}}°C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
        </div>
      </div>
      <div id = "tomorrow" class = "yes fourth">
        <div class = "yes" style = "margin-left: 1%" v-for="(weather1, i) in tomorrowTmps" :key="i">
        {{weather1.fcstValue}}°C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
      


        </div>
      </div>
          <b-container id="sub-container">
          </b-container>
        </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { getTodayWeatherSky,getTodayWeatherTmp, getTomorrowWeatherSky,getTomorrowWeatherTmp} from "@/api/weather"
const memberStore = "memberStore";

export default {
  name: "TheHeaderNavbar",
  data() {
    return {
      key : 0,
      currentItem: 0,   
      todaySkys:[],
      tomorrowSkys:[],
      todayTmps:[],
      tomorrowTmps:[],
    };
  },
  created() {
    getTodayWeatherSky(
      ({ data }) => {
        this.todaySkys = data.result;
        console.log(this.todaySkys)
      },
      (error) => {
        console.log(error);
      }
    );
    getTomorrowWeatherSky(
      ({ data }) => {
        this.tomorrowSkys = data.result;
        console.log(this.tomorrowSkys)
      },
      (error) => {
        console.log(error);
      }
    );
    getTodayWeatherTmp(
      ({ data }) => {
        this.todayTmps = data.result;
        console.log(this.todayTmps)
      },
      (error) => {
        console.log(error);
      }
    );
    getTomorrowWeatherTmp(
      ({ data }) => {
        this.tomorrowTmps = data.result;
        console.log(this.tomorrowTmps)
      },
      (error) => {
        console.log(error);
      }
    );
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
    },
    onBeforeSlideChange(index) {
      this.currentItem = index;
    },

  },
};
</script>

<style scoped>

#sub-container {
  height: 50px;
  display: flex;
  justify-content: left;
}

#category-container {
  height: 50px;
  width: 100%;  
  background-color: #607499a1;
  box-shadow: 5px 1px 10px 3px gray;
  /* filter: drop-shadow(0 -5px 0.5rem #211c6d); */
}


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

/* vueper slide 시작 */
.bord {
  height: 2px;
  width: 100%;
  background-color: rgb(143 143 143);
  margin-top: 20px;
  margin-bottom: 20px;
}

.vueperslide__title{
  font-size: 3em; 
  color: white; 
  text-align:left;
  background-color:#64646483;
}

.vueperslides__parallax-wrapper{
  border-radius: 18px;
}

/*이미지 부분 */
.vueperslide vueper-slide vueperslide--active vueperslide--visible {
  background-size: 1415px;
  /* background-position-x: 50px; */
  background-position-y: -4px;
  z-index: 10;
}


.vueperslide__content-wrapper:not(.vueperslide__content-wrapper--outside-top):not(.vueperslide__content-wrapper--outside-bottom) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  background-color:black;
}

#sub-container{
  width:80%;
}
.first{
  position:relative;
  top:9.3%;
  left:30%;
  width : 1000px;
}
.second{
  position:relative;
  top:11.3%;
  left:30%;
  width : 1000px;
}
.yes{
  display:flex;
  align-content: stretch;
    flex-wrap: wrap;
  
}
.third{
  position:absolute;
  top:9.9%;
  left:32%;
  width : 1000px;
  
}
.fourth{
  position:absolute;
  top:12.4%;
  left:32%;
  width : 1000px;
  z-index: 1;
}


</style>
