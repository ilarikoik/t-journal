import axios from "axios";

// const api = axios.create({ baseURL: "/api" });
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
});

export const authService = {
  login: (username: string, password: string) =>
    api
      .post<{ token: string }>("/auth/login", { username, password })
      .then((r) => r.data),

  register: (username: string, password: string) =>
    api
      .post<{ token: string }>("/auth/register", { username, password })
      .then((r) => r.data),
};

export const getToken = () => localStorage.getItem("token");
export const setToken = (token: string) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");
export const setUsernameStorage = (username: string) =>
  localStorage.setItem("username", username);
export const getUsername = () => localStorage.getItem("username");
export const removeUsername = () => localStorage.removeItem("username");
