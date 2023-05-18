import jwtDecode from "jwt-decode";
import { login, findById, register, checkId } from "@/api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    signInError: "",
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
    },
    setSIGN_ERROR(state, value) {
      state.signInError = value;
    },
  },
  actions: {
    setSIGN_ERROR({ commit }) {
      commit("SET_SIGNIN_ERROR", "");
    },
    async userConfirm({ commit }, member) {
      await login(
        member,
        (response) => {
          let accessToken = response.data.result["accessToken"];
          commit("SET_IS_LOGIN", true);
          commit("SET_IS_LOGIN_ERROR", false);
          commit("SET_IS_VALID_TOKEN", true);
          commit("SET_USER_INFO", response.data.result["member"]);
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
        (response) => {
          if (response.data.isSuccess === true) {
            commit("SET_USER_INFO", response.data.result);
          } else {
            console.log(0);
          }
        },
        async (error) => {
          console.log(error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async registCheckId({ commit }, memberId) {
      await checkId(memberId, (response) => {
        console.log(response);
        if (response.data.isSuccess === true) {
          commit("SET_SIGNIN_ERROR", "사용가능한 아이디입니다");
        } else {
          commit("SET_SIGNIN_ERROR", response.data.message);

          console.log(response.data.message);
        }
      });
    },

    async userRegist({ commit }, member) {
      await register(member, (response) => {
        console.log(response);
        if (response.data.isSuccess === true) {
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
