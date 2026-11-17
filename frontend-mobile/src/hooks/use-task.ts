import { useCallback, useEffect, useState } from 'react';

import type { TaskStatus } from '@/constants/task-status';
import { getErrorMessage } from '@/services/api';
import { fetchTask, updateTaskStatus } from '@/services/tasks';
import type { Task } from '@/types/task';

/** Estado da tela de detalhes: carrega `GET /tasks/{id}` e altera o status via API. */
export function useTask(id: string | undefined) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) {
      setError('Tarefa não informada.');
      setLoading(false);
      return;
    }
    try {
      setTask(await fetchTask(id));
      setError(null);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const retry = useCallback(() => {
    setLoading(true);
    load();
  }, [load]);

  /** Só atualiza a tela depois que a API confirma, assim o app nunca mostra um status que não foi salvo. */
  const changeStatus = useCallback(
    async (next: TaskStatus) => {
      if (!task || updating || task.status === next) return;
      setUpdating(true);
      setUpdateError(null);
      try {
        setTask(await updateTaskStatus(task.id, next));
      } catch (e) {
        setUpdateError(getErrorMessage(e));
      } finally {
        setUpdating(false);
      }
    },
    [task, updating],
  );

  return { task, loading, error, updating, updateError, retry, changeStatus };
}
