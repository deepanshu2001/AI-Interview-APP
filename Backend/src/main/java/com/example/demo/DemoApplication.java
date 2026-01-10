package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class DemoApplication {
    @Bean
	PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}
	public static void main(String[] args) {
		Dotenv dotenv=Dotenv.configure().ignoreIfMissing().load();
		System.setProperty("GROK_API_KEY",dotenv.get("GROK_API_KEY"));
		System.setProperty("SECRET_KEY",dotenv.get("SECRET_KEY"));
		SpringApplication.run(DemoApplication.class, args);
	}

}
