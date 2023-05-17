import { apiInstance } from "./http.js";

const api = apiInstance();

function listPlace(param, success, fail) {
  api.get(`/place`, { params: param }).then(success).catch(fail);
}

function writePlace(article, success, fail) {
  api.post(`/place`, JSON.stringify(article)).then(success).catch(fail);
}

function getPlace(articleno, success, fail) {
  api.get(`/place/${articleno}`).then(success).catch(fail);
}

function modifyPlace(article, success, fail) {
  api.put(`/place`, JSON.stringify(article)).then(success).catch(fail);
}

function deletePlace(articleno, success, fail) {
  api.delete(`/place/${articleno}`).then(success).catch(fail);
}

export { listPlace, writePlace, getPlace, modifyPlace, deletePlace };
