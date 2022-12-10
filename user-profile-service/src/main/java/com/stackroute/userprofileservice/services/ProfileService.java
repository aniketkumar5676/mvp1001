package com.stackroute.userprofileservice.services;

import com.stackroute.userprofileservice.ExceptionHandler.NotFound;
import com.stackroute.userprofileservice.dto.UserInfo;
import com.stackroute.userprofileservice.entity.UserCredentials;
import com.stackroute.userprofileservice.repo.UserCrediantialRepo;
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
        userInfo.setCity(user.getCity());
        userInfo.setCountry(user.getCountry());
        userInfo.setZip(user.getZip());

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
            userCredentials.setCity(userInfo.getCity());
            userCredentials.setCountry(userInfo.getCountry());
            userCredentials.setZip(userInfo.getZip());

            return userCrediantialRepo.save(userCredentials);

        }
        throw new NotFound("user not found");

    }

}
