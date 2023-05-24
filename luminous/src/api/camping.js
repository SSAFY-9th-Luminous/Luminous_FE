import { apiInstance } from "./http.js";

const api = apiInstance();

async function campingMap(param, success, fail) {
  await api.get(`/camping/map`, { params: param }).then(success).catch(fail);
}

async function listCamping(param, success, fail) {
  await api.get("/camping", { params: param }).then(success).catch(fail);
}

async function getCamping(id, success, fail) {
  await api.get(`/camping/${id}`).then(success).catch(fail);
}

async function submitRate(param, success, fail) {
  await api.post(`/camping/rate`, JSON.stringify(param)).then(success).catch(fail);
}

async function getCampingListByLocation(location, success, fail) {
  await api.get("/camping/location", { params: location }).then(success).catch(fail);
}

export { campingMap, listCamping, getCamping, submitRate, getCampingListByLocation };
