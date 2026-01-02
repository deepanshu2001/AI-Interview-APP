package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Entities.CodingRating;

public interface CodingRatingRepository extends JpaRepository<CodingRating,Long> {
   
}
