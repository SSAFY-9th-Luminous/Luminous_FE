import { apiInstance } from "./http.js";

const api = apiInstance();

async function listObservatory(param, success, fail) {
  await api.get(`/observatorys`, { params: param }).then(success).catch(fail);
}

export { listObservatory };
