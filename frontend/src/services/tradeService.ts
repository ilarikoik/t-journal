import axios from "axios";
import type { Trade, TradeFormData, TradeStats } from "@/types/trade";
import { getToken } from "./authService";

// const api = axios.create({ baseURL: '/api' })

// const api = axios.create({ baseURL: "/api" });
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const tradeService = {
  getAll: () => api.get<Trade[]>("/trades").then((r) => r.data),
  getById: (id: number) => api.get<Trade>(`/trades/${id}`).then((r) => r.data),
  getStats: () => api.get<TradeStats>("/trades/stats").then((r) => r.data),

  create: (data: TradeFormData) => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, v as string | Blob);
    });
    return api
      .post<Trade>("/trades", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },
  update: (id: number, data: Partial<TradeFormData>) => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, v as string | Blob);
    });
    return api
      .put<Trade>(`/trades/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },

  delete: (id: number) => api.delete(`/trades/${id}`),
};
