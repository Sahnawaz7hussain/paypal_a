import axios from "axios";
import { headerObject } from "./headers";
const base_url = import.meta.env.VITE_BASE_URL;

export const getAllUsers = () => {
  return axios.get(`${base_url}/user/getall`, { headers: headerObject() });
};

export const switchRole = (reqId, data) => {
  return axios.patch(`${base_url}/user/update/${reqId}`, data, {
    headers: headerObject(),
  });
};
