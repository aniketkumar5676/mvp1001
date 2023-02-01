package com.mvp.apigateway.repo;

import com.mvp.apigateway.models.EmployeerInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerRepo  extends JpaRepository<EmployeerInformation,String> {
    EmployeerInformation findByEmployerId(String username);

    EmployeerInformation findByEmailId(String emailId);
}
