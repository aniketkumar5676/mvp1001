package com.stackroute.apigateway.repo;

import com.stackroute.apigateway.models.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCrediantialRepo extends JpaRepository<UserCredentials,String> {
    UserCredentials findByUserId(String userId);
    UserCredentials findByEmailId(String emailId);
}
