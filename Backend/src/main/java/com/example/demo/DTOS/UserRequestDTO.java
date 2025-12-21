package com.example.demo.DTOS;

import lombok.Data;

@Data
public class UserRequestDTO {
  private Long id;
  private String name;
  private String email;
  private String password;    
}

