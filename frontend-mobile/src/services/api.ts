import axios from 'axios';
import { Platform } from 'react-native';

/**
 * 🔌 BACKEND — URL BASE E CLIENTE HTTP
 *
 * Defina `EXPO_PUBLIC_API_URL` no arquivo `.env` (veja `.env.example`).
 * Sem essa variável, o app tenta o backend local padrão do Spring Boot (porta 8080).
 */
const FALLBACK_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? FALLBACK_URL).replace(/\/+$/, '');

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

/**
 * 🔌 BACKEND (opcional) — AUTENTICAÇÃO
 * Se a API exigir JWT/token, descomente e informe de onde ele vem:
 *
 * api.interceptors.request.use((config) => {
 *   const token = ...; // ex.: lido do expo-secure-store
 *   if (token) config.headers.Authorization = `Bearer ${token}`;
 *   return config;
 * });
 */

/** Transforma qualquer erro em uma mensagem legível para o usuário. */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return 'O servidor demorou demais para responder. Tente novamente.';
    }
    if (error.response) {
      const { status, data } = error.response;
      // Spring Boot costuma devolver { message: "..." } nos erros.
      const serverMessage =
        data && typeof data === 'object' && 'message' in data ? String(data.message) : null;
      if (status === 404) return serverMessage ?? 'Tarefa não encontrada.';
      return serverMessage ?? `O servidor respondeu com erro (${status}).`;
    }
    return `Não foi possível conectar à API em ${API_URL}. Verifique se o backend está no ar e se a URL está correta.`;
  }
  return 'Ocorreu um erro inesperado.';
}
