import axios from "axios";
import { config, base_url } from "../../utils/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    return response.data;
  }
};
const login = async (user) => {
  const response = await axios.post(`${base_url}user/login`, user);
  if (response.data) {
    return response.data;
  }
};
export const authService = {
  register,
  login,
};