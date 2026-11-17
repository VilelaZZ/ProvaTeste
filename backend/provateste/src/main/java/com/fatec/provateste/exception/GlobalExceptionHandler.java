
package com.fatec.provateste.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> tratarValidacao(
            MethodArgumentNotValidException exception) {

        Map<String, String> erros = new HashMap<>();

        exception.getBindingResult().getFieldErrors().forEach(erro ->
                erros.put(erro.getField(), erro.getDefaultMessage())
        );

        Map<String, Object> resposta = new HashMap<>();
        resposta.put("status", 400);
        resposta.put("mensagem", "Erro de validação");
        resposta.put("erros", erros);

        return ResponseEntity.badRequest().body(resposta);
    }

    @ExceptionHandler(TarefaNaoEncontradaException.class)
    public ResponseEntity<Map<String, Object>> tratarNaoEncontrada(
            TarefaNaoEncontradaException exception) {

        Map<String, Object> resposta = new HashMap<>();
        resposta.put("status", 404);
        resposta.put("mensagem", exception.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resposta);
    }
}
