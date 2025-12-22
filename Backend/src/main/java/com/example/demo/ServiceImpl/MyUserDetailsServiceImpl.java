package com.example.demo.ServiceImpl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.Entities.User;
import com.example.demo.Entities.UserPrinciple;
import com.example.demo.Repositories.UserRepository;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;

@AllArgsConstructor
@Service
public class MyUserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
  @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByEmail(username);
        if (user == null) throw new UsernameNotFoundException("User not found");
        return new UserPrinciple(user);
    }
}
