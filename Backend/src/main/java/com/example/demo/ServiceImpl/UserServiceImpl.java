package com.example.demo.ServiceImpl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.DTOS.UserRequestDTO;
import com.example.demo.DTOS.UserResponseDTO;
import com.example.demo.Entities.User;
import com.example.demo.Exceptions.UserAlreadyExist;
import com.example.demo.Exceptions.UserNotFoundException;
import com.example.demo.Repositories.CodingInterviewRepository;
import com.example.demo.Repositories.UserRepository;
import com.example.demo.Services.UserService;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CodingInterviewRepository codingInterviewRepository;
    public UserResponseDTO login(UserRequestDTO userRequestDTO){
        User user=userRepository.findByEmail(userRequestDTO.getEmail());
        if(user==null){
            throw new UserNotFoundException("User with email does not exist");
        }
       if (user != null && passwordEncoder.matches(userRequestDTO.getPassword(), user.getPassword())) {
            UserResponseDTO userResponseDTO=new UserResponseDTO();
            userResponseDTO.setId(user.getId());
            userResponseDTO.setEmail(user.getEmail());
            userResponseDTO.setName(user.getName());
            return userResponseDTO;
        }
        else{
            return null;
        }
    }
    public UserResponseDTO register(UserRequestDTO userRequestDTO){
        if(userRepository.findByEmail(userRequestDTO.getEmail())!=null){
            throw new UserAlreadyExist("Email Already exists!!!");
        }
        User user=new User();
        user.setName(userRequestDTO.getName());
        user.setEmail(userRequestDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        
        userRepository.save(user);
        UserResponseDTO userResponseDTO=new UserResponseDTO();
        userResponseDTO.setId(user.getId());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setName(user.getName());
        return userResponseDTO;
    }
    public UserResponseDTO getByuserId(Long id){
        User user=userRepository.findById(id).orElse(null);
        if(user!=null){
            UserResponseDTO userResponseDTO=new UserResponseDTO();
            userResponseDTO.setId(user.getId());
            userResponseDTO.setEmail(user.getEmail());
            userResponseDTO.setName(user.getName());
            return userResponseDTO;
        }
        else{
            return null;
        }
    }
    public UserResponseDTO findUser(UserDetails userDetails){
        UserResponseDTO userResponseDTO=new UserResponseDTO();
        User user=userRepository.findByEmail(userDetails.getUsername());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setName(user.getName());
        userResponseDTO.setId(user.getId());
        return userResponseDTO;
    }
    public Long countTotalDSARounds(Long id){
        Long cnt=codingInterviewRepository.countByUserId(id);
        return cnt;
    }
}

