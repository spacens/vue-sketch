import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000"
});

export const setToken = token => {
  instance.defaults.headers.Authorization = `JWT ${token}`;
};

export const unsetToken = () => {
  delete instance.defaults.headers.Authorization;
};

export default instance;
