package com.stackroute.apigateway.service;

import com.stackroute.apigateway.ExceptionHandler.NotFound;
import com.stackroute.apigateway.models.AuthenticationStatus;
import com.stackroute.apigateway.models.UserCredentials;
import com.stackroute.apigateway.repo.UserCrediantialRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class LoginService {
    @Autowired
    UserCrediantialRepo userCrediantialRepo;

    public AuthenticationStatus authenticate(String username, String password) throws NotFound {
        AuthenticationStatus status;

        UserCredentials userByUserId= userCrediantialRepo.findByUserId(username);
        UserCredentials userByEmail= userCrediantialRepo.findByEmailId(username);

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();



        if(userByUserId!=null){
            if( passwordEncoder.matches(password, userByUserId.getPassword())) {
              return status = new AuthenticationStatus(true, "Authentication Successful",userByUserId.getUserId(),userByUserId.getUsername(),
                                                                                   userByUserId.getEmailId(),userByUserId.getContact_no(),userByUserId.getRole());
            }
            throw new NotFound("Password Incorrect");
        }

        if(userByEmail!=null) {
            if ( passwordEncoder.matches(password, userByEmail.getPassword())){
                return status = new AuthenticationStatus(true, "Authentication Successful",userByEmail.getUserId(),userByEmail.getUsername(),
                        userByEmail.getEmailId(),userByEmail.getContact_no(),userByEmail.getRole());
            }
            throw new NotFound("Password Incorrect");
        }
        throw new NotFound("Try to Register with us");

    }
}
