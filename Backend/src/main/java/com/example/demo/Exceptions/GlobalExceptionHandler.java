package com.example.demo.Exceptions;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    private ResponseEntity<Object> buildErrorResponse(String message, HttpStatus status) {
        Map<String, Object> errorResponseMap = new HashMap<>();
        errorResponseMap.put("TimeStamp", LocalDateTime.now());
        errorResponseMap.put("Message", message);
        errorResponseMap.put("Error", status.getReasonPhrase());
        errorResponseMap.put("Status", status.value());
        return new ResponseEntity<>(errorResponseMap, status);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> HandleUserNotFoundException(UserNotFoundException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(UserAlreadyExist.class)
    public ResponseEntity<Object> HandleUserAlreadyExist(UserAlreadyExist ex){
        return buildErrorResponse(ex.getMessage(),HttpStatus.BAD_REQUEST);
    }
}
