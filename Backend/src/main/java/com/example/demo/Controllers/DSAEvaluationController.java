package com.example.demo.Controllers;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTOS.DSAEvaluationDTO;
import com.example.demo.Services.DSAEvaluationService;


import lombok.AllArgsConstructor;

@RestController

@RequestMapping("/api")
@AllArgsConstructor
public class DSAEvaluationController {
    //methods for handling Dsa evaluation 
   
    private final DSAEvaluationService dsaEvaluationService;
    @PostMapping("/user/dsa-evaluation")
    public ResponseEntity<?> getEvaluation(@RequestBody DSAEvaluationDTO dsaEvaluationDTO){
       String result=dsaEvaluationService.evaluateCode(dsaEvaluationDTO);
       return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
