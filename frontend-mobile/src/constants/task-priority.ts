/** Prioridade de uma tarefa — valores IGUAIS aos do enum da API (enunciado): BAIXA, MEDIA ou ALTA. */
export type TaskPriority = 'BAIXA' | 'MEDIA' | 'ALTA';

export const PRIORITY_ORDER: TaskPriority[] = ['BAIXA', 'MEDIA', 'ALTA'];

export const PRIORITY_LABEL: Record<TaskPriority, string> = {
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta',
};

/** Quantas barrinhas do indicador ficam preenchidas (1 a 3). */
export const PRIORITY_LEVEL: Record<TaskPriority, number> = { BAIXA: 1, MEDIA: 2, ALTA: 3 };

export function priorityFromApi(value: string | null | undefined): TaskPriority {
  const normalized = String(value ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .toUpperCase();
  const found = PRIORITY_ORDER.find((p) => p === normalized);

  if (!found) {
    console.warn(`[TaskFlow] Prioridade desconhecida vinda da API: "${value}". Esperado: ${PRIORITY_ORDER.join(', ')}.`);
    return 'MEDIA';
  }
  return found;
}
