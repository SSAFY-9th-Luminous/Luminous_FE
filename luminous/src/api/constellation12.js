import { apiInstance } from "./http.js";

const api = apiInstance();

async function listConstellation12(success, fail) {
  await api.get('/constellations-12/list').then(success).catch(fail);
}


export { listConstellation12 };
