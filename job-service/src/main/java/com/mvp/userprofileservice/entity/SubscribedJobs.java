package com.mvp.userprofileservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubscribedJobs {
    @Id
    @GeneratedValue
    private int id;
    private String jobId;
    private String userId;

    public SubscribedJobs(String jobId, String userId) {
        this.jobId = jobId;
        this.userId = userId;
    }
}
