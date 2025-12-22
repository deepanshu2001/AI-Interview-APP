package com.example.demo.ServiceImpl;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.example.demo.DTOS.DSAEvaluationDTO;
import com.example.demo.Services.DSAEvaluationService;
@Service
public class DSAEvaluationServiceImpl implements DSAEvaluationService{
    private final ChatClient dsaClient;
    DSAEvaluationServiceImpl(@Qualifier("DSAEvaluationClient") ChatClient dsaClient){
        this.dsaClient=dsaClient;
    }
    public String evaluateCode(DSAEvaluationDTO dsaEvaluationDTO){
       String usercode=dsaEvaluationDTO.getUsercode();
       String problem=dsaEvaluationDTO.getProblem();
        String prompt = """
    Problem Statement:
    %s

    User Code:
    %s

    Evaluate the solution strictly using the criteria defined.
    """.formatted(problem, usercode);
       return dsaClient.prompt().user(prompt).call().content();


    }
}
