package com.example.demo.DTOS;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class BehaviourEvaluationDTO {
    private String question;
    private MultipartFile audio;
    private Long userId;
}
