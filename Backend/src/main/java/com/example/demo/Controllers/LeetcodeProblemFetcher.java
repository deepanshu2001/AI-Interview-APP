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
public class LeetcodeProblemFetcher {
    
    
    private final ChatClient leetcodeclient;
    LeetcodeProblemFetcher(@Qualifier("LeetcodeClient") ChatClient leetcodeclient){
        this.leetcodeclient=leetcodeclient;
    }
    @GetMapping("/dsa-problem")
    public ResponseEntity<?> getLeetcodeQuestion(){
        String prompt="Pick up a random leetcode question with the appropiate response as suggested. ";
        String response=leetcodeclient.prompt().user(prompt).call().content();
        return new ResponseEntity<>(response,HttpStatus.ACCEPTED);
    }
}
