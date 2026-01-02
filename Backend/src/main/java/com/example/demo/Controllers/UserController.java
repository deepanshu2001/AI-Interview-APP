package com.example.demo.Controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTOS.UserRequestDTO;
import com.example.demo.DTOS.UserResponseDTO;
import com.example.demo.Services.JWTService;
import com.example.demo.Services.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final JWTService jwtService;
    
    // settup for login and register
    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserRequestDTO userRequestDTO,
            HttpServletResponse response) {
        UserResponseDTO userResponseDTO = userService.login(userRequestDTO);

        // Create and set JWT cookie
        Cookie jwtCookie = new Cookie("jwt",
                jwtService.generateJwtToken(userRequestDTO.getEmail(), userRequestDTO.getId()));
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false); // Set to true in production with HTTPS
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
        jwtCookie.setAttribute("SameSite", "Lax");

        response.addCookie(jwtCookie);
        
        return ResponseEntity.ok(userResponseDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){
        Cookie cookie=new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setAttribute("SameSite","Lax");
        response.addCookie(cookie);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserRequestDTO userRequestDTO) {

        UserResponseDTO userResponseDTO = userService.register(userRequestDTO);
        return ResponseEntity.ok(userResponseDTO);

    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getuserById(@PathVariable("id") Long id) {
        UserResponseDTO userResponseDTO = userService.getByuserId(id);
        return ResponseEntity.ok(userResponseDTO);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(@AuthenticationPrincipal UserDetails userDetails) {
        UserResponseDTO userResponseDTO = userService.findUser(userDetails);
        return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
    }
    @GetMapping("/interview-details/{id}")
    public ResponseEntity<?> getInterviewDetails(@PathVariable("id") Long id){
        Long dsarounds=userService.countTotalDSARounds(id);
        Map<String,Long> map=new HashMap<>();
        map.put("totalInterviews",dsarounds);
        map.put("totalDSARounds",dsarounds);
        map.put("totalBehavioralRounds",dsarounds);
       
        return new ResponseEntity<>(map,HttpStatus.OK);
    }

}