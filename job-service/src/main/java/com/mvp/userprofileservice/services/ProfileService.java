package com.mvp.userprofileservice.services;

import com.mvp.userprofileservice.ExceptionHandler.NotFound;
import com.mvp.userprofileservice.dto.UserInfo;
import com.mvp.userprofileservice.entity.UserCredentials;
import com.mvp.userprofileservice.repo.UserCrediantialRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    UserCrediantialRepo userCrediantialRepo;

    @Autowired
    UserInfo userInfo;

    public UserInfo findByUserUserId(String userId){
        UserCredentials user= userCrediantialRepo.findByUserId(userId);
        userInfo.setUserId(user.getUserId());
        userInfo.setUsername(user.getUsername());
        userInfo.setEmail_id(user.getEmailId());
        userInfo.setContact_no(user.getContact_no());
        userInfo.setAddress(user.getAddress());
         return userInfo;
    }

    public UserCredentials updateUserDetails(UserInfo userInfo, String userId) throws NotFound {
        UserCredentials userCredentials = userCrediantialRepo.findByUserId(userId);

        if(userCredentials!=null) {

//        userCredentials.setUserId(userInfo.getUserId());
            userCredentials.setUsername(userInfo.getUsername());
            userCredentials.setEmailId(userInfo.getEmail_id());
            userCredentials.setContact_no(userInfo.getContact_no());
            userCredentials.setAddress(userInfo.getAddress());
            return userCrediantialRepo.save(userCredentials);

        }
        throw new NotFound("user not found");

    }

}
