import { apiInstance } from "./http.js";

const api = apiInstance();

async function listCamping(param, success, fail) {
  await api.get(`/camping`, { params: param }).then(success).catch(fail);
}

export { listCamping };
