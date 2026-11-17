import type { TaskPriority } from '@/constants/task-priority';
import type { TaskStatus } from '@/constants/task-status';

/**
 * Entidade `Tarefa` do enunciado. A tradução do JSON da API para este formato é feita em `services/tasks.ts`.
 *
 * | campo       | tipo   | regra                           |
 * |-------------|--------|---------------------------------|
 * | id          | Long   | gerado automaticamente          |
 * | titulo      | String | obrigatório                     |
 * | descricao   | String | opcional                        |
 * | responsavel | String | obrigatório                     |
 * | status      | String | PENDENTE, EM_ANDAMENTO, CONCLUIDA |
 * | prioridade  | String | BAIXA, MEDIA ou ALTA            |
 */
export interface Task {
  id: string;
  titulo: string;
  descricao: string | null;
  responsavel: string;
  status: TaskStatus;
  prioridade: TaskPriority;
}
