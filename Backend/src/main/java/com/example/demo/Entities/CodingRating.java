package com.example.demo.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "coding_ratings")
@Data
@NoArgsConstructor
public class CodingRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long interviewId;
    private Integer correctness;
    private Integer TimeComplexity;
    private Integer spaceComplexity;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String feedback;
}

