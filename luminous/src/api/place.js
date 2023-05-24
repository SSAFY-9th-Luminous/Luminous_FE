import { apiInstance } from "./http.js";

const api = apiInstance();

async function listPlace(param, success, fail) {
  await api.get(`/places`, { params: param }).then(success).catch(fail);
}

// async function writePlace(place, success, fail) {
//   await api.post(`/places`, JSON.stringify(place)).then(success).catch(fail);
// }
async function writePlace(formData, success, fail) {
  await api.post(`/places`, formData, {
    headers: {
      'Content-Type' : 'multipart/form-data',
    },
  }).then(success).catch(fail);
}

async function getPlace(articleno, success, fail) {
  await api.get(`/places/${articleno}`).then(success).catch(fail);
}

async function modifyPlace(article, success, fail) {
  console.log(JSON.stringify(article))
  await api.put(`/places/${article.id}`, JSON.stringify(article)).then(success).catch(fail);
}

async function deletePlace(id, success, fail) {
  await api.delete(`/places/${id}`).then(success).catch(fail);
}

export { listPlace, writePlace, getPlace, modifyPlace, deletePlace };
