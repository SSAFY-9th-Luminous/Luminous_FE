import { apiInstance } from "./http.js";

const api = apiInstance();

async function listConstellation(success, fail) {
  await api.get('/constellations/list').then(success).catch(fail);
}


export { listConstellation };
