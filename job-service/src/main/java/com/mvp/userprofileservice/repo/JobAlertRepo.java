package com.mvp.userprofileservice.repo;

import com.mvp.userprofileservice.entity.JobAlert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobAlertRepo extends JpaRepository<JobAlert,Integer> {
    JobAlert findByJobIdAndUserId(String jobId, String userId);

    List<JobAlert> findAllByUserId(String id);

    List<JobAlert> findAllByUserIdAndNotified(String id, String c);
}
