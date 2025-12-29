package com.example.demo.DTOS;

import com.example.demo.Entities.InterviewStatus;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class CodingInterviewDTO {
   private Long id;
   private Long userId;
   private Long ratingid;

   @Enumerated(EnumType.STRING)
   private InterviewStatus status;
}
