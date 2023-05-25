import { apiInstance } from "./http.js";

const api = apiInstance();

async function getWeather(success, fail) {
  await api.post(`/weather`).then(success).catch(fail);
}

export { getWeather };
