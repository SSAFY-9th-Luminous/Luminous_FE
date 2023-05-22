import { apiInstance } from "./http.js";

const api = apiInstance();

async function listFortune(success, fail) {
  await api.get('/fortunes/list').then(success).catch(fail);
}


export { listFortune };
