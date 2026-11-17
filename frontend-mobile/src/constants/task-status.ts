/**
 * Status de uma tarefa — valores IGUAIS aos do enum da API (enunciado):
 * PENDENTE, EM_ANDAMENTO ou CONCLUIDA. Assim o app envia e recebe o texto exato, sem tradução.
 */
export type TaskStatus = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';

/** Ordem do fluxo: usada no seletor de status, no filtro e na barra de progresso. */
export const STATUS_ORDER: TaskStatus[] = ['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA'];

export const STATUS_LABEL: Record<TaskStatus, string> = {
  PENDENTE: 'Pendente',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Concluída',
};

/** Normaliza "Em andamento", "concluída", "EM_ANDAMENTO"... para comparar com o enum. */
function normalize(value: string | null | undefined): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .replace(/[\s-]+/g, '_')
    .toUpperCase();
}

/** Converte o status vindo da API para o status do app. Valor desconhecido vira PENDENTE (com aviso). */
export function statusFromApi(value: string | null | undefined): TaskStatus {
  const normalized = normalize(value);
  const found = STATUS_ORDER.find((s) => s === normalized);

  if (!found) {
    console.warn(`[TaskFlow] Status desconhecido vindo da API: "${value}". Esperado: ${STATUS_ORDER.join(', ')}.`);
    return 'PENDENTE';
  }
  return found;
}
