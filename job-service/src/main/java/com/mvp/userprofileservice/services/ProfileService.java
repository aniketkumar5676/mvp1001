package com.mvp.userprofileservice.services;

import com.mvp.userprofileservice.ExceptionHandler.NotFound;
import com.mvp.userprofileservice.dto.UserInfo;
import com.mvp.userprofileservice.entity.EmployeerInformation;
import com.mvp.userprofileservice.entity.UserCredentials;
import com.mvp.userprofileservice.repo.EmployerRepo;
import com.mvp.userprofileservice.repo.UserCrediantialRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    UserCrediantialRepo userCrediantialRepo;

    @Autowired
    EmployerRepo employerRepo;
    @Autowired
    UserInfo userInfo;

    public UserInfo findByUserUserId(String userId){
        UserCredentials user= userCrediantialRepo.findByUserId(userId);
        userInfo.setUserId(user.getUserId());
        userInfo.setUsername(user.getUsername());
        userInfo.setEmail_id(user.getEmailId());
        userInfo.setAlternativeEmailId(user.getAlternativeEmailId());
        userInfo.setContact_no(user.getContact_no());
        userInfo.setAlternativeContactNo(user.getAlternativeContactNo());
        userInfo.setAddress(user.getAddress());
         return userInfo;
    }

    public UserCredentials updateUserDetails(UserInfo userInfo) throws NotFound {
        UserCredentials userCredentials = userCrediantialRepo.findByUserId(userInfo.getUserId());

        if(userCredentials!=null) {
//        userCredentials.setUserId(userInfo.getUserId());
            userCredentials.setUsername(userInfo.getUsername());
            userCredentials.setEmailId(userInfo.getEmail_id());
            userCredentials.setAlternativeEmailId(userInfo.getAlternativeEmailId());
            userCredentials.setContact_no(userInfo.getContact_no());
            userCredentials.setAlternativeContactNo(userInfo.getAlternativeContactNo());
            userCredentials.setAddress(userInfo.getAddress());
            return userCrediantialRepo.save(userCredentials);

        }
        throw new NotFound("user not found");

    }

    public UserInfo findByEmployeeId(String employeeId) {
        EmployeerInformation user= employerRepo.findByEmployerId(employeeId);
        userInfo.setUserId(user.getEmployerId());
        userInfo.setUsername(user.getEmployeeName());
        userInfo.setEmail_id(user.getEmailId());
        userInfo.setAlternativeEmailId(user.getAlternativeEmailId());
        userInfo.setContact_no(user.getContact_no());
        userInfo.setAlternativeContactNo(user.getAlternativeContactNo());
        userInfo.setAddress(user.getAddress());
        return userInfo;
    }

    public EmployeerInformation updateEmployeeById(UserInfo userInfo) throws NotFound {

        EmployeerInformation employeerInformation = employerRepo.findByEmployerId(userInfo.getUserId());

        if(employeerInformation!=null) {
//        userCredentials.setUserId(userInfo.getUserId());
            employeerInformation.setEmployeeName(userInfo.getUsername());
            employeerInformation.setEmailId(userInfo.getEmail_id());
            employeerInformation.setAlternativeEmailId(userInfo.getAlternativeEmailId());
            employeerInformation.setContact_no(userInfo.getContact_no());
            employeerInformation.setAlternativeContactNo(userInfo.getAlternativeContactNo());
            employeerInformation.setAddress(userInfo.getAddress());
            return employerRepo.save(employeerInformation);

        }
        throw new NotFound("user not found");
    }
}
