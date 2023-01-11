package com.mvp.apigateway.repo;

import com.mvp.apigateway.models.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCrediantialRepo extends JpaRepository<UserCredentials,String> {
    UserCredentials findByUserId(String userId);
    UserCredentials findByEmailId(String emailId);
}
