import jwtDecode from "jwt-decode";
import { login, findById, register, checkId, withdraw, modify} from "@/api/member";

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
    resetLOGIN_ERROR({ commit }) {
      commit("SET_IS_LOGIN_ERROR", false);
    },
    setSIGN_ERROR({ commit }, status) {
      commit("SET_SIGNIN_ERROR", status);
    },
    async userConfirm({ commit }, member) {
      await login(
        member,
        (response) => {
          let jwt = response.headers.authorization;
          commit("SET_IS_LOGIN", true);
          commit("SET_IS_LOGIN_ERROR", false);
          commit("SET_IS_VALID_TOKEN", true);
          commit("SET_USER_INFO", response.data.result["member"]);
          sessionStorage.setItem("access-token", jwt);
          
        },
        (error) => {
          console.log(error);
          commit("SET_IS_LOGIN_ERROR", true);
        }
      );
    },
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      await findById(
        decodeToken.id,
        (response) => {
          if (response.data.isSuccess === true) {
            console.log(response.data.result)
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
          commit;
        }
      });
    },
    async userModify({ commit }, member) {
      await modify(member, (response) => {
        console.log(response);
        if (response.data.isSuccess === true) {
          alert("회원정보 수정 완료");
        } else {
          commit;
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
    async userWithdraw({ commit }, token) {
      let decodeToken = jwtDecode(token);
      await withdraw(decodeToken.id, (response) => {
        if (response.data.isSuccess === true) {
          alert("회원탈퇴 완료");
          commit("SET_IS_LOGIN", false);
          commit("SET_USER_INFO", null);
          commit("SET_IS_VALID_TOKEN", false);
          sessionStorage.clear();
        }
        else {
          alert("오류 발생")
        }
      })
    }
  },
};

export default memberStore;
