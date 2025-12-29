package com.example.demo.ServiceImpl;

import javax.management.RuntimeErrorException;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.example.demo.DTOS.CodingInterviewDTO;
import com.example.demo.DTOS.DSAEvaluationDTO;
import com.example.demo.Entities.CodingInterview;
import com.example.demo.Entities.CodingRating;
import com.example.demo.Entities.InterviewStatus;
import com.example.demo.Repositories.CodingInterviewRepository;
import com.example.demo.Repositories.CodingRatingRepository;
import com.example.demo.Services.DSAEvaluationService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class DSAEvaluationServiceImpl implements DSAEvaluationService{
    private final ChatClient dsaClient;
    private final CodingInterviewRepository codingInterviewRepository;
    private final CodingRatingRepository codingRatingRepository;
    private final ObjectMapper objectMapper;
    DSAEvaluationServiceImpl(@Qualifier("DSAEvaluationClient") ChatClient dsaClient,CodingInterviewRepository codingInterviewRepository,CodingRatingRepository codingRatingRepository,ObjectMapper objectMapper){
        this.dsaClient=dsaClient;
        this.codingInterviewRepository=codingInterviewRepository;
        this.codingRatingRepository=codingRatingRepository;
        this.objectMapper=objectMapper;
    }
    public String evaluateCode(DSAEvaluationDTO dsaEvaluationDTO){
        try{
          String usercode=dsaEvaluationDTO.getUsercode();
       String problem=dsaEvaluationDTO.getProblem();
        String prompt = """
    Problem Statement:
    %s

    User Code:
    %s

    Evaluate the solution strictly using the criteria defined.
    """.formatted(problem, usercode);
    String result=dsaClient.prompt().user(prompt).call().content();
    JsonNode jsonNode=objectMapper.readTree(result);
    
    CodingInterview codingInterview=new CodingInterview();
    codingInterview.setUserId(dsaEvaluationDTO.getUserid());
    codingInterview.setStatus(InterviewStatus.Completed);
    CodingInterview savedInterview=codingInterviewRepository.save(codingInterview);
    CodingRating codingRating=new CodingRating();
    codingRating.setCorrectness(jsonNode.get("correctness").asInt());
    codingRating.setTimeComplexity(jsonNode.get("timeComplexity").asInt());
    codingRating.setSpaceComplexity(jsonNode.get("spaceComplexity").asInt());
    codingRating.setFeedback(jsonNode.get("feedback").asText());
    codingRating.setInterviewId(savedInterview.getId());
    CodingRating savedRating=codingRatingRepository.save(codingRating);
    savedInterview.setRatingid(savedRating.getId());
    codingInterviewRepository.save(savedInterview);
    
    return result;
        }
        catch(Exception e){
            throw new RuntimeException(e);
        }
       

    }
}
