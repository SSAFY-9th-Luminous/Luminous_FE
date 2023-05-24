import { apiInstance } from "./http.js";

const api = apiInstance();

async function observatoryMap(param, success, fail) {
  await api.get(`/observatory/map`, { params: param }).then(success).catch(fail);
}

async function listObservatory(param, success, fail) {
  await api.get("/observatory", { params: param }).then(success).catch(fail);
}

async function getObservatory(id, success, fail) {
  await api.get(`/observatory/${id}`).then(success).catch(fail);
}

async function getObservatoryListByLocation(success, fail) {
  await api.get(`/observatory/location`).then(success).catch(fail);
}

export { observatoryMap, listObservatory, getObservatory, getObservatoryListByLocation };
