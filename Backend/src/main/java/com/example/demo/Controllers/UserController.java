package com.example.demo.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTOS.UserRequestDTO;
import com.example.demo.DTOS.UserResponseDTO;
import com.example.demo.Services.UserService;

import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    //settup for login and register
    @GetMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserRequestDTO userRequestDTO){
        UserResponseDTO userResponseDTO=userService.login(userRequestDTO);
        return ResponseEntity.ok(userResponseDTO);
    }
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserRequestDTO userRequestDTO){
        UserResponseDTO userResponseDTO=userService.register(userRequestDTO);
        return ResponseEntity.ok(userResponseDTO);
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getuserById(@PathVariable("id") Long id){
        UserResponseDTO userResponseDTO=userService.getByuserId(id);
        return ResponseEntity.ok(userResponseDTO);
    }

}