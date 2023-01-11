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
    private int jobId;
    private String userId;

    public SubscribedJobs(int jobId, String userId) {
        this.jobId = jobId;
        this.userId = userId;
    }
}
