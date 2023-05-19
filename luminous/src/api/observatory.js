import { apiInstance } from "./http.js";

const api = apiInstance();

async function observatoryMap(param, success, fail) {
  await api.get(`/observatory/map`, { params: param }).then(success).catch(fail);
}

export { observatoryMap };
