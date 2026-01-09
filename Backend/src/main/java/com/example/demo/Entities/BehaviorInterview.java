package com.example.demo.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;

@Entity
@Data
public class BehaviorInterview {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long overallScore;
    private Long communication;
    private Long situationalAwareness;
    private Long leadershipSkills;
    private Long teamworkAbility;
    private Long conflictResolution;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String overallFeedback;

}
