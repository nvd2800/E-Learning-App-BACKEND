// src/api/client.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.128:4000", // đổi IP LAN của máy backend
  timeout: 10000,
});

// set token mỗi khi login
export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}
