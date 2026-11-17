
package com.fatec.provateste.service;
import com.fatec.provateste.exception.TarefaNaoEncontradaException;
import com.fatec.provateste.model.Tarefa;
import com.fatec.provateste.repository.TarefaRepository;
import com.fatec.provateste.enums.Status;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    public List<Tarefa> listarTodas() {
        return tarefaRepository.findAll();
    }

    public Tarefa buscarPorId(Long id) {
    return tarefaRepository.findById(id)
            .orElseThrow(() -> new TarefaNaoEncontradaException(id));
 }

    public Tarefa criar(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    public Tarefa atualizar(Long id, Tarefa dados) {
        Tarefa tarefa = buscarPorId(id);

        tarefa.setTitulo(dados.getTitulo());
        tarefa.setDescricao(dados.getDescricao());
        tarefa.setResponsavel(dados.getResponsavel());
        tarefa.setStatus(dados.getStatus());
        tarefa.setPrioridade(dados.getPrioridade());

        return tarefaRepository.save(tarefa);
    }

    public Tarefa atualizarStatus(Long id, Status status) {
        Tarefa tarefa = buscarPorId(id);

        tarefa.setStatus(status);

        return tarefaRepository.save(tarefa);
    }

    public void excluir(Long id) {
        Tarefa tarefa = buscarPorId(id);
        tarefaRepository.delete(tarefa);
    }
}
