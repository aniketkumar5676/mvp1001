package com.mvp.userprofileservice.repo;

import com.mvp.userprofileservice.entity.JobForm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobFormRepo extends JpaRepository<JobForm,Integer> {

    List<JobForm> findAllByPublisherId(String pub);
}
