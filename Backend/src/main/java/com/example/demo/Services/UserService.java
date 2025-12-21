package com.example.demo.Services;

import com.example.demo.DTOS.UserRequestDTO;
import com.example.demo.DTOS.UserResponseDTO;

public interface UserService {
  public UserResponseDTO login(UserRequestDTO userRequestDTO);
  public UserResponseDTO register(UserRequestDTO userRequestDTO);
  public UserResponseDTO getByuserId(Long  id);
}
