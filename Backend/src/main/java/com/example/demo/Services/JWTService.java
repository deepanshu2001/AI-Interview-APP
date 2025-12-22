package com.example.demo.Services;

import org.springframework.security.core.userdetails.UserDetails;

public interface JWTService {
   String generateJwtToken(String email, Long userId);

    String extractEmail(String token);

    boolean validateToken(String token, UserDetails userDetails);
}
