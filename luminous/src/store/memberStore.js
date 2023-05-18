import jwtDecode from "jwt-decode";
// import router from "@/router";
import { login, findById, register, checkId } from "@/api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    signInError: false,
    userInfo: null,
    isValidToken: false,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_SIGNIN_ERROR: (state, signInError) => {
      state.signInError = signInError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
      // sessionStorage.setItem("userinfo", JSON.stringify(userInfo.id));
    },
    setSIGN_ERROR(state, value) {
      state.signInError = value;
    },
  },
  actions: {
    setSIGN_ERROR({ commit }) {
      commit("SET_SIGNIN_ERROR", false);
    },
    async userConfirm({ commit }, member) {
      await login(
        member,
        ({ data }) => {
          let accessToken = data["accessToken"];
          commit("SET_IS_LOGIN", true);
          commit("SET_IS_LOGIN_ERROR", false);
          commit("SET_IS_VALID_TOKEN", true);
          commit("SET_USER_INFO", data["member"]);
          sessionStorage.setItem("access-token", accessToken);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      await findById(
        decodeToken.id,
        ({ data }) => {
          if (data.message === "success") {
            console.log(data);
          } else {
            commit("SET_USER_INFO", data);
          }
        },
        async (error) => {
          console.log(
            "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async registCheckId({ commit }, memberId) {
      await checkId(memberId, (response) => {
        console.log(response);
        if (response.data === true) {
          commit("SET_SIGNIN_ERROR", false);
        } else {
          commit("SET_SIGNIN_ERROR", true);
        }
      });
    },

    async userRegist({ commit }, member) {
      await register(member, (response) => {
        console.log(response);
        if (response.data === true) {
          alert("회원가입 완료");
        } else {
          console.log(1);
          console.log(commit);
        }
      });
    },
    userLogout({ commit }) {
      function logout() {
        commit("SET_IS_LOGIN", false);
        commit("SET_USER_INFO", null);
        commit("SET_IS_VALID_TOKEN", false);
        sessionStorage.clear();
      }
      logout();
    },
  },
};

export default memberStore;
