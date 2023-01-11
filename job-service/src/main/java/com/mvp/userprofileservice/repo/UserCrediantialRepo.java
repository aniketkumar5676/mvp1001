package com.mvp.userprofileservice.repo;

import com.mvp.userprofileservice.entity.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCrediantialRepo extends JpaRepository<UserCredentials,String> {

    UserCredentials findByUserId(String userId);
    UserCredentials findByEmailId(String emailId);
}
