package com.mvp.userprofileservice.repo;

import com.mvp.userprofileservice.entity.EmployeerInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerRepo  extends JpaRepository<EmployeerInformation,String> {


    EmployeerInformation findByEmployerId(String userId);

    EmployeerInformation findByEmailId(String emailId);
}
