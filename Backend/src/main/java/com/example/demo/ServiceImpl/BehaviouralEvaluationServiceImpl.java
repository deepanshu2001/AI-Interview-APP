package com.example.demo.ServiceImpl;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiAudioTranscriptionModel;
import org.springframework.ai.openai.OpenAiAudioTranscriptionOptions;
import org.springframework.ai.openai.api.OpenAiAudioApi;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import com.example.demo.DTOS.BehaviourEvaluationDTO;
import com.example.demo.Entities.BehaviorInterview;
import com.example.demo.Repositories.BehaviorInterviewRepository;
import com.example.demo.Services.BehaviouralEvaluationService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class BehaviouralEvaluationServiceImpl implements BehaviouralEvaluationService {
    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;
    private final OpenAiAudioTranscriptionModel openAiAudioTranscriptionModel;
    private final BehaviorInterviewRepository behaviorInterviewRepository;
    BehaviouralEvaluationServiceImpl(@Qualifier("BehaviorEvaluationClient") ChatClient chatClient,ObjectMapper objectMapper,OpenAiAudioTranscriptionModel o,BehaviorInterviewRepository b){
        this.chatClient=chatClient;
        this.objectMapper=objectMapper;
        this.openAiAudioTranscriptionModel=o;
        this.behaviorInterviewRepository=b;
    }  
    public String evaluateAudio(BehaviourEvaluationDTO dto){
        try {
            
            String transcription = transcribeAudio(dto.getAudio());
            
           
            String evaluationPrompt = String.format(
                """
                Question: %s
                
                Candidate's Response: %s
                
                Please evaluate this response and return ONLY a valid JSON object with no additional text, explanation, or markdown formatting.
                
                The JSON must have exactly this structure:
                {
                  "overallScore": <number between 1-10>,
                  "communication": <integer 1-10>,
                  "situationalAwareness": <integer 1-10>,
                  "leadershipSkills": <integer 1-10>,
                  "teamworkAbility": <integer 1-10>,
                  "conflictResolution": <integer 1-10>,
                  "overallFeedback": "<detailed feedback text>"
                }
                
                Return ONLY the JSON object, nothing else.
                """,
                dto.getQuestion(),
                transcription
            );
            
           
            String evaluation = chatClient.prompt()
                .user(evaluationPrompt)
                .call()
                .content();
            
            JsonNode evaluationJson = objectMapper.readTree(evaluation);
            
            // Step 5: Save to database
            BehaviorInterview behaviorInterview = new BehaviorInterview();
            Long userId=dto.getUserId();
            behaviorInterview.setUserId(userId);
            behaviorInterview.setOverallScore(evaluationJson.get("overallScore").asLong());
            behaviorInterview.setCommunication(evaluationJson.get("communication").asLong());
            behaviorInterview.setSituationalAwareness(evaluationJson.get("situationalAwareness").asLong());
            behaviorInterview.setLeadershipSkills(evaluationJson.get("leadershipSkills").asLong());
            behaviorInterview.setTeamworkAbility(evaluationJson.get("teamworkAbility").asLong());
            behaviorInterview.setConflictResolution(evaluationJson.get("conflictResolution").asLong());
            behaviorInterview.setOverallFeedback(evaluationJson.get("overallFeedback").asText());
            
            // Save to database
            behaviorInterviewRepository.save(behaviorInterview);
            return evaluation;
            
        } catch (Exception e) {
            throw new RuntimeException("Error evaluating audio: " + e.getMessage(), e);
        }

    }
    private String transcribeAudio(org.springframework.web.multipart.MultipartFile audioFile) {
        try {
            // Convert MultipartFile to Resource
            ByteArrayResource audioResource = new ByteArrayResource(audioFile.getBytes()) {
                @Override
                public String getFilename() {
                    return audioFile.getOriginalFilename();
                }
            };
            
            // Configure transcription options
            OpenAiAudioTranscriptionOptions options = OpenAiAudioTranscriptionOptions.builder()
                .model("whisper-large-v3")
                .responseFormat(OpenAiAudioApi.TranscriptResponseFormat.TEXT)
                .language("en")
                .build();
            
            
            var response = openAiAudioTranscriptionModel.call(
                new org.springframework.ai.audio.transcription.AudioTranscriptionPrompt(
                    audioResource, 
                    options
                )
            );
            
            return response.getResult().getOutput();
            
        } catch (Exception e) {
            throw new RuntimeException("Error transcribing audio: " + e.getMessage(), e);
        }
    }
}
