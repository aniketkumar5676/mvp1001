package com.mvp.apigateway.service;

import com.mvp.apigateway.ExceptionHandler.NotFound;
import com.mvp.apigateway.models.*;
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


        if (loginType.equals("User")) {

            UserCredentials userByUserId = userCrediantialRepo.findByUserId(username);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (userByUserId != null) {
                if (passwordEncoder.matches(password, userByUserId.getPassword())) {
                    return status = new AuthenticationStatus(true, "Authentication Successful", userByUserId.getUserId(), userByUserId.getUsername(),
                            userByUserId.getRole());
                }
                throw new NotFound("Password Incorrect");
            }

        }

        if (loginType.equals("Employee")) {

            EmployeerInformation employeerInformation = employerRepo.findByEmployerId(username);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (employeerInformation != null) {
                if (passwordEncoder.matches(password, employeerInformation.getPassword())) {
                    return status = new AuthenticationStatus(true, "Authentication Successful", employeerInformation.getEmployerId(), employeerInformation.getEmployeeName(),
                            employeerInformation.getRole());
                }
                throw new NotFound("Password Incorrect");
            }

        }


        if (loginType.equals("Institute")) {

            InstituteInfo universityInfo = universityRepo.findByInstituteId(username);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (universityInfo != null) {
                if (passwordEncoder.matches(password, universityInfo.getPassword())) {
                    return status = new AuthenticationStatus(true, "Authentication Successful", universityInfo.getInstituteId(), universityInfo.getInstituteName(),
                            universityInfo.getRole());
                }
                throw new NotFound("Password Incorrect");
            }

        }


        throw new NotFound("Try to Register with us");

    }

    public String checkUser(CheckUser user) throws NotFound {

        if (user.getRole().equals("User")) {
            UserCredentials userByEmailId = userCrediantialRepo.findByEmailId(user.getEmailId());
            if (userByEmailId != null) {
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

                return "User Exists";
            }
            throw new NotFound("User Not Found");

        }


        if (user.getRole().equals("Employee")) {

            EmployeerInformation employeerInformation = employerRepo.findByEmailId(user.getEmailId());
            if (employeerInformation != null) {

                return "Employee Exists";
            }
            throw new NotFound("Something Went Wrong");

        }

        if (user.getRole().equals("Institute")) {
            throw new NotFound("Something Went Wrong");
        }

        throw new NotFound("Something Went Wrong");
    }


    //Update of Password

    public String updatePass(UpdatePass updatePass) throws NotFound {

        if (updatePass.getRole().equals("User")) {
            UserCredentials userByEmailId = userCrediantialRepo.findByEmailId(updatePass.getEmailId());
            if (userByEmailId != null) {
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                String passwordEncoded = passwordEncoder.encode(updatePass.getPassword());
                userByEmailId.setPassword(passwordEncoded);
                userCrediantialRepo.save(userByEmailId);
                return "Password Updated Successfully";

            }
            throw new NotFound("Password Not Updated");

        }


        if (updatePass.getRole().equals("Employee")) {

            EmployeerInformation employeerInformation = employerRepo.findByEmailId(updatePass.getEmailId());
            if (employeerInformation != null) {
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                String passwordEncoded = passwordEncoder.encode(updatePass.getPassword());
                employeerInformation.setPassword(passwordEncoded);
                employerRepo.save(employeerInformation);
                return "Password Updated Successfully";
            }
            throw new NotFound("Password Not Updated");
        }
        throw new NotFound("Something Went Wrong");
    }
}