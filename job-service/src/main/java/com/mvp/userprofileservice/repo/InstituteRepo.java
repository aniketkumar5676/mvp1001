package com.mvp.userprofileservice.repo;

import com.mvp.userprofileservice.entity.InstituteInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstituteRepo extends JpaRepository<InstituteInfo,String> {


    InstituteInfo findByInstituteId(String userId);

    InstituteInfo findByEmailId(String emailId);
}
