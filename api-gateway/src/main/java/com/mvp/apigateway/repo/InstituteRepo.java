package com.mvp.apigateway.repo;

import com.mvp.apigateway.models.InstituteInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstituteRepo extends JpaRepository<InstituteInfo,String> {

    InstituteInfo findByInstituteId(String username);
}
