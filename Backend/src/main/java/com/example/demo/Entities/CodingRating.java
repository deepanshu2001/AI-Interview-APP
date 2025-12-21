package com.example.demo.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "coding_ratings")
@Data
public class CodingRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long interviewId;
    private Integer correctness;
    private Integer TimeComplexity;
    private Integer spaceComplexity;
    private String feedback;
}

