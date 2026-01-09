package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entities.BehaviorInterview;
import com.example.demo.Entities.User;

public interface BehaviorInterviewRepository extends JpaRepository<BehaviorInterview,Long> {
   User findByUserId(Long userid);
   Long countByUserId(Long userid);
}
