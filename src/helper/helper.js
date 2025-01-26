import api from "../../axios";




export const getRequest = (url) => {
  return api.get(url);
};

export const postRequest = (url, data = {}) => {
  return api.post(url, data);
};

export const putRequest = (url, data = {}) => {
  return api.put(url, data);
};

export const deleteRequest = (url) => {
  return api.delete(url);
};

