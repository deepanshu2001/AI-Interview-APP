package com.example.demo.Entities;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.networknt.schema.OutputFormat.List;

import lombok.AllArgsConstructor;


public class UserPrinciple implements UserDetails {
   private final User user;

    public UserPrinciple(User user) {
        this.user = user;
    }

    

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    public Long getId() {
        return user.getId();
    }

    

    public String getEmail() {
        return user.getEmail();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return java.util.Collections.emptyList();
    }

}
