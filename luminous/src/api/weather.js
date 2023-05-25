import { apiInstance } from "./http.js";

const api = apiInstance();

async function getWeather(success, fail) {
  await api.get(`/weather`).then(success).catch(fail);
}

async function getTodayWeatherSky(success, fail) {
    await api.get(`/weather/today/sky`).then(success).catch(fail);
}
  
async function getTomorrowWeatherSky(success, fail) {
    await api.get(`/weather/tomorrow/sky`).then(success).catch(fail);
}

async function getTodayWeatherTmp(success, fail) {
    await api.get(`/weather/today/tmp`).then(success).catch(fail);
}
  
async function getTomorrowWeatherTmp(success, fail) {
    await api.get(`/weather/tomorrow/tmp`).then(success).catch(fail);
}
  


export { getWeather, getTodayWeatherSky, getTodayWeatherTmp, getTomorrowWeatherSky, getTomorrowWeatherTmp };
