package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entities.CodingInterview;
import com.example.demo.Entities.User;

public interface CodingInterviewRepository extends JpaRepository<CodingInterview,Long>  {
   User findByUserId(Long userid);
}
