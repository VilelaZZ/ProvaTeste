
package com.fatec.provateste.controller;
import jakarta.validation.Valid;
import com.fatec.provateste.model.Tarefa;
import com.fatec.provateste.service.TarefaService;
import com.fatec.provateste.enums.Status;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
@CrossOrigin(origins = "*")
public class TarefaController {

    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

    // Listar todas as tarefas
    @GetMapping
    public ResponseEntity<List<Tarefa>> listarTodas() {
        return ResponseEntity.ok(tarefaService.listarTodas());
    }

    // Buscar tarefa por ID
    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(tarefaService.buscarPorId(id));
    }

    // Cadastrar tarefa
    @PostMapping
    public ResponseEntity<Tarefa> criar(@Valid @RequestBody Tarefa tarefa) {
    Tarefa novaTarefa = tarefaService.criar(tarefa);
    return ResponseEntity.status(HttpStatus.CREATED).body(novaTarefa);
}

    // Atualizar tarefa completa
   @PutMapping("/{id}")
   public ResponseEntity<Tarefa> atualizar(
   @PathVariable Long id,
   @Valid @RequestBody Tarefa tarefa) {

    return ResponseEntity.ok(tarefaService.atualizar(id, tarefa));
}

    // Atualizar somente o status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Tarefa> atualizarStatus(
            @PathVariable Long id,
            @RequestBody Status status) {

        return ResponseEntity.ok(tarefaService.atualizarStatus(id, status));
    }

    // Excluir tarefa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        tarefaService.excluir(id);

        return ResponseEntity.noContent().build();
    }
}
