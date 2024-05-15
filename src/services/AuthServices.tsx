import axios from "axios";
import { UserProfileToken } from "../models/User";

const api = "https://api.homologation.cliqdrive.com.br/";

// Adiciona um interceptor a requisição
axios.interceptors.request.use(
  (config) => {
    // Add headers antes da requisição
    config.headers['Accept'] = 'application/json;version=v1_web';
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export const loginAPI = async (email: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "auth/login/", {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {    
    throw error;
  }
};
