package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Entities.CodingRating;

public interface CodingRatingRepository extends JpaRepository<CodingRating,Long> {
   List<CodingRating> findByInterviewIdIn(List<Long> interviewIds);
    
    
}
