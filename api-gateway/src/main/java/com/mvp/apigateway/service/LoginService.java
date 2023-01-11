package com.mvp.apigateway.service;

import com.mvp.apigateway.ExceptionHandler.NotFound;
import com.mvp.apigateway.models.AuthenticationStatus;
import com.mvp.apigateway.models.EmployeerInformation;
import com.mvp.apigateway.models.InstituteInfo;
import com.mvp.apigateway.models.UserCredentials;
import com.mvp.apigateway.repo.EmployerRepo;
import com.mvp.apigateway.repo.InstituteRepo;
import com.mvp.apigateway.repo.UserCrediantialRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class LoginService {
    @Autowired
    UserCrediantialRepo userCrediantialRepo;
    @Autowired
    EmployerRepo employerRepo;
    @Autowired
    InstituteRepo universityRepo;

    public AuthenticationStatus authenticate(String username, String password, String loginType) throws NotFound {
        AuthenticationStatus status;


        if(loginType.equals("User")){

            UserCredentials userByUserId= userCrediantialRepo.findByUserId(username);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if(userByUserId!=null){
                if( passwordEncoder.matches(password, userByUserId.getPassword())) {
                    return status = new AuthenticationStatus(true, "Authentication Successful",userByUserId.getUserId(),userByUserId.getUsername(),
                            userByUserId.getRole());
                }
                throw new NotFound("Password Incorrect");
            }

        }

        if(loginType.equals("Employee")){

            EmployeerInformation employeerInformation= employerRepo.findByEmployerId(username);

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if(employeerInformation!=null){
                if( passwordEncoder.matches(password, employeerInformation.getPassword())) {
                    return status = new AuthenticationStatus(true, "Authentication Successful",employeerInformation.getEmployerId(),employeerInformation.getEmployeeName(),
                            employeerInformation.getRole());
                }
                throw new NotFound("Password Incorrect");
            }

        }


        if(loginType.equals("Institute")){

            InstituteInfo universityInfo= universityRepo.findByInstituteId(username);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if(universityInfo!=null){
                if( passwordEncoder.matches(password, universityInfo.getPassword())) {
                    return status = new AuthenticationStatus(true, "Authentication Successful",universityInfo.getInstituteId(),universityInfo.getInstituteName(),
                            universityInfo.getRole());
                }
                throw new NotFound("Password Incorrect");
            }

        }






        throw new NotFound("Try to Register with us");

    }
}
