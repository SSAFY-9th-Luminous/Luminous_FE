import { apiInstance } from "./http.js";

const api = apiInstance();

async function campingMap(param, success, fail) {
  await api.get(`/camping/map`, { params: param }).then(success).catch(fail);
}

async function listCamping(param, success, fail) {
  await api.get("/camping", { params: param }).then(success).catch(fail);
}

export { campingMap, listCamping };
