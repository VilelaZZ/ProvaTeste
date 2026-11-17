import axios from 'axios';

import { priorityFromApi } from '@/constants/task-priority';
import { statusFromApi, type TaskStatus } from '@/constants/task-status';
import type { Task } from '@/types/task';

import { api } from './api';

/**
 * 🔌 BACKEND — ENDPOINTS E FORMATO DO JSON
 *
 * Tudo que liga o app à API Java está neste arquivo. O enunciado não define o caminho do recurso,
 * então ele vem de `EXPO_PUBLIC_TASKS_PATH` (padrão: `/tarefas`). Se o seu controller for
 * `@RequestMapping("/api/tarefas")`, use `EXPO_PUBLIC_TASKS_PATH=/api/tarefas` no `.env`.
 */
const BASE = `/${(process.env.EXPO_PUBLIC_TASKS_PATH ?? '/tarefas').replace(/^\/+|\/+$/g, '')}`;

const ENDPOINTS = {
  list: BASE, //                                       GET   → lista de tarefas
  detail: (id: string) => `${BASE}/${id}`, //          GET   → uma tarefa
  updateStatus: (id: string) => `${BASE}/${id}/status`, // PATCH → body: { status }
};

/** Espelho do JSON devolvido pela API (campos do enunciado). */
interface TaskDto {
  id: number | string; // Long
  titulo: string;
  descricao?: string | null;
  responsavel?: string | null;
  status: string; // PENDENTE | EM_ANDAMENTO | CONCLUIDA
  prioridade?: string | null; // BAIXA | MEDIA | ALTA
}

function mapTask(dto: TaskDto): Task {
  return {
    id: String(dto.id),
    titulo: dto.titulo,
    descricao: dto.descricao?.trim() ? dto.descricao : null,
    responsavel: dto.responsavel?.trim() || 'Sem responsável',
    status: statusFromApi(dto.status),
    prioridade: priorityFromApi(dto.prioridade),
  };
}

/** GET — aceita lista simples `[...]` ou página do Spring `{ content: [...] }`. */
export async function fetchTasks(): Promise<Task[]> {
  const { data } = await api.get<TaskDto[] | { content: TaskDto[] }>(ENDPOINTS.list);
  const list = Array.isArray(data) ? data : (data?.content ?? []);
  return list.map(mapTask);
}

/** GET /{id} */
export async function fetchTask(id: string): Promise<Task> {
  const { data } = await api.get<TaskDto>(ENDPOINTS.detail(id));
  return mapTask(data);
}

/**
 * Altera o status. O enunciado não fixa o formato, então tentamos nesta ordem:
 *   1. PATCH /{id}/status  com { "status": "EM_ANDAMENTO" }
 *   2. (se a API responder 404/405) PUT /{id} com a tarefa inteira e o novo status
 * Se a API responder 204 (sem corpo), a tarefa é buscada de novo.
 */
export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  try {
    const { data } = await api.patch<TaskDto | ''>(ENDPOINTS.updateStatus(id), { status });
    return data && typeof data === 'object' ? mapTask(data) : fetchTask(id);
  } catch (e) {
    const code = axios.isAxiosError(e) ? e.response?.status : undefined;
    if (code !== 404 && code !== 405) throw e;
  }

  const { data: current } = await api.get<TaskDto>(ENDPOINTS.detail(id));
  const { data } = await api.put<TaskDto | ''>(ENDPOINTS.detail(id), { ...current, status });
  return data && typeof data === 'object' ? mapTask(data) : fetchTask(id);
}
