package com.example.demo.Exceptions;

public class UserAlreadyExist extends RuntimeException {
    public UserAlreadyExist(String message){
        super(message);
    }
}
