
export interface Tarefa {
  id?: number;
  titulo: string;
  descricao?: string;
  responsavel: string;
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';
  prioridade: 'BAIXA' | 'MEDIA' | 'ALTA';
}

const API_URL = 'http://localhost:8080/api/tarefas';

export const TarefaService = {
  async listar(): Promise<Tarefa[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao listar tarefas');
    return response.json();
  },

  async buscarPorId(id: number): Promise<Tarefa> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar tarefa');
    return response.json();
  },

  async cadastrar(tarefa: Tarefa): Promise<Tarefa> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarefa),
    });
    if (!response.ok) throw new Error('Erro ao cadastrar tarefa');
    return response.json();
  },

  async atualizar(id: number, tarefa: Tarefa): Promise<Tarefa> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarefa),
    });
    if (!response.ok) throw new Error('Erro ao atualizar tarefa');
    return response.json();
  },

  async atualizarStatus(
    id: number,
    status: Tarefa['status']
  ): Promise<Tarefa> {
    const response = await fetch(`${API_URL}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(status),
    });
    if (!response.ok) throw new Error('Erro ao atualizar status');
    return response.json();
  },

  async excluir(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir tarefa');
  },
};
