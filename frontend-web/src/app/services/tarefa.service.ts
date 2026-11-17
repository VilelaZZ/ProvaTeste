
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarefa {
  id?: number;
  titulo: string;
  descricao?: string;
  responsavel: string;
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';
  prioridade: 'BAIXA' | 'MEDIA' | 'ALTA';
}

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/tarefas';

  listar(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
  }

  cadastrar(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa);
  }

  atualizar(id: number, tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, tarefa);
  }

  atualizarStatus(id: number, status: string): Observable<Tarefa> {
    return this.http.patch<Tarefa>(
      `${this.apiUrl}/${id}/status`,
      status,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
