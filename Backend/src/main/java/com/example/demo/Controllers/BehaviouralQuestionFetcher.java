package com.example.demo.Controllers;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
public class BehaviouralQuestionFetcher {
   private final ChatClient behavioralclient;
   BehaviouralQuestionFetcher(@Qualifier("BehavioralClient") ChatClient behavioralclient){
    this.behavioralclient=behavioralclient;
   }
   @GetMapping("/behavioralquestion")
   public ResponseEntity<String> fetchQuestion(){
    String prompt="Give me a behavioral interview question.";
    String response=behavioralclient.prompt().user(prompt).call().content();
    return new ResponseEntity<>(response,HttpStatus.OK);
   }
}
