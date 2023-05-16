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
            <router-link :to="{ name: 'main' }" class="link">
              <b-icon icon="house-door" animation="fade" font-scale="2"></b-icon>
              홈
            </router-link>
            <router-link :to="{ path: 'observatory' }" class="m-2 link">
              <b-icon icon="star" animation="fade" font-scale="2"></b-icon>
              천문대
            </router-link>
            <router-link :to="{ name: 'place' }" class="m-2 link">
              <b-icon icon="map" animation="fade" font-scale="2"/>
              마이플레이스
            </router-link>
            
          </b-nav-item>

        <!-- Right aligned nav items -->
        
          <router-link :to="{ name: 'login' }" class="link m-2" font-scale = "2" v-if="!getUser">
           로그인
        </router-link>
          <b-nav-item-dropdown right v-if="getUser">
            <template #button-content>
              <b-icon icon="people" font-scale="2"></b-icon>
            </template>
            <b-dropdown-item href="#">
              <a href="#" @click="logout">로그아웃</a>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link :to="{ name: 'login' }" class="link">
                <b-icon icon="key"></b-icon> 마이페이지
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "TheHeaderNavbar",
  data() {
    return {};
  },
  methods:{
    logout() {
      this.$emit("logout");
    },
  },
  computed: {
    getUser() {
      if (this.user) {
        return true;
      } else {
        return false;
      }
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
</style>
