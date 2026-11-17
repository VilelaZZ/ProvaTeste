import { useCallback, useState } from 'react';

import { fetchTasks } from '@/services/tasks';
import { getErrorMessage } from '@/services/api';
import type { Task } from '@/types/task';

/** Estado da listagem: carrega `GET /tasks` e expõe recarregar / puxar para atualizar. */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true); // só na primeira carga
  const [refreshing, setRefreshing] = useState(false); // pull-to-refresh
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setTasks(await fetchTasks());
      setError(null);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const refresh = useCallback(() => {
    setRefreshing(true);
    load();
  }, [load]);

  const retry = useCallback(() => {
    setLoading(true);
    load();
  }, [load]);

  return { tasks, loading, refreshing, error, reload: load, refresh, retry };
}
