package com.example.demo.Entities;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@Entity
@AllArgsConstructor
public class CodingInterview {
   @Id
   @GeneratedValue(strategy =GenerationType.IDENTITY)
   private Long id;
   private Long userId;
   private Long ratingid;

   @Enumerated(EnumType.STRING)
   private InterviewStatus status;

}
