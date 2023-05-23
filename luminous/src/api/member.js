import { apiInstance } from "./http.js";

const api = apiInstance();

async function login(member, success, fail) {
  await api.post(`/member/login`, JSON.stringify(member)).then(success).catch(fail);
}

async function findById(id, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/member/detail/${id}`).then(success).catch(fail);
}

async function checkId(memberId, success, fail) {
  await api.get(`/member/check-id/${memberId}`).then(success).catch(fail);
}
async function register(member, success, fail) {
  await api.post(`/member/register`, JSON.stringify(member)).then(success).catch(fail);
}

async function modify(member, success, fail) {
  await api.put(`/member`, JSON.stringify(member)).then(success).catch(fail);
}

async function withdraw(id, success, fail){
  await api.delete(`/member/${id}`).then(success).catch(fail);
}

export { login, findById, register, checkId, modify, withdraw};
