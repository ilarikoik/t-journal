import axios from "axios";
import { getToken } from "./authService";

export interface IdeaNote {
  id: number;
  header: string;
  content: string;
  createdAt: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const ideasAndNotesService = {
  getAll: () => api.get<IdeaNote[]>("/ideas-and-notes").then((r) => r.data),
  create: (header: string, content: string) =>
    api
      .post<IdeaNote>("/ideas-and-notes", { header, content })
      .then((r) => r.data),
  update: (id: number, data: Partial<IdeaNote>) =>
    api.put<IdeaNote>(`/ideas-and-notes/${id}`, data).then((r) => r.data),
  delete: (id: number) => api.delete(`/ideas-and-notes/${id}`),
};
