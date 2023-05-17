import { apiInstance } from "./http.js";

const api = apiInstance();

function listPlace(param, success, fail) {
  api.get(`/places`, { params: param }).then(success).catch(fail);
}

function writePlace(article, success, fail) {
  api.post(`/places`, JSON.stringify(article)).then(success).catch(fail);
}

function getPlace(articleno, success, fail) {
  api.get(`/places/${articleno}`).then(success).catch(fail);
}

function modifyPlace(article, success, fail) {
  api.put(`/places`, JSON.stringify(article)).then(success).catch(fail);
}

function deletePlace(id, success, fail) {
  api.delete(`/places/${id}`).then(success).catch(fail);
}

export { listPlace, writePlace, getPlace, modifyPlace, deletePlace };
