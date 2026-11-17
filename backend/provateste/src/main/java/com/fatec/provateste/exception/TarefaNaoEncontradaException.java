
package com.fatec.provateste.exception;

public class TarefaNaoEncontradaException extends RuntimeException {

    public TarefaNaoEncontradaException(Long id) {
        super("Tarefa com ID " + id + " não encontrada");
    }
}
