package com.stackroute.userprofileservice.repo;

import com.stackroute.userprofileservice.entity.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCrediantialRepo extends JpaRepository<UserCredentials,String> {

    UserCredentials findByUserId(String userId);
    UserCredentials findByEmailId(String emailId);
}
