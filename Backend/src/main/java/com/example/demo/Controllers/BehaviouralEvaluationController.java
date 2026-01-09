package com.example.demo.Controllers;

import java.util.logging.Handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.DTOS.BehaviourEvaluationDTO;
import com.example.demo.Services.BehaviouralEvaluationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class BehaviouralEvaluationController {
   private final BehaviouralEvaluationService behaviouralEvaluationService;
   @PostMapping("/user/behaviour")
   public ResponseEntity<?> evaluateResponse(@ModelAttribute BehaviourEvaluationDTO dto){
       
       String question=dto.getQuestion();
       MultipartFile audio=dto.getAudio();
       String result=behaviouralEvaluationService.evaluateAudio(dto);
       return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
   }
}
