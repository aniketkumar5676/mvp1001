package com.mvp.userprofileservice.repo;

import com.mvp.userprofileservice.entity.SubscribedJobs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscribedJobRepo extends JpaRepository<SubscribedJobs,Integer> {
    List<SubscribedJobs> findAllByJobId(String jobId);

    SubscribedJobs findByJobIdAndUserId(String jobId, String userId);
}
