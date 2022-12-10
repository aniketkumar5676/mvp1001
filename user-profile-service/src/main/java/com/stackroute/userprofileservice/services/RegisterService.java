package com.stackroute.userprofileservice.services;

import com.stackroute.userprofileservice.ExceptionHandler.NotFound;
import com.stackroute.userprofileservice.entity.UserCredentials;
import com.stackroute.userprofileservice.repo.UserCrediantialRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class RegisterService {
    @Autowired
    UserCrediantialRepo userCrediantialRepo;
    public String addUser(UserCredentials newUserCredential) throws NotFound {

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String passwordEncoded = passwordEncoder.encode(newUserCredential.getPassword());
        newUserCredential.setPassword(passwordEncoded);

        if( userCrediantialRepo.findByUserId(newUserCredential.getUserId())!=null ||
                userCrediantialRepo.findByEmailId(newUserCredential.getEmailId()) != null){
            throw new NotFound("User Already Exists");
        }
        userCrediantialRepo.save(newUserCredential);
        return "User Successfully Registered to Us";
    }
}
