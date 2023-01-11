package com.mvp.userprofileservice.services;

import com.mvp.userprofileservice.ExceptionHandler.NotFound;
import com.mvp.userprofileservice.dto.JobApply;
import com.mvp.userprofileservice.entity.JobForm;
import com.mvp.userprofileservice.entity.Resume;
import com.mvp.userprofileservice.entity.SubscribedJobs;
import com.mvp.userprofileservice.repo.JobFormRepo;
import com.mvp.userprofileservice.repo.ResumeRepo;
import com.mvp.userprofileservice.repo.SubscribedJobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    @Autowired
    JobFormRepo jobFormRepo;
    @Autowired
    SubscribedJobRepo subscribedJobRepo;

    @Autowired
    ResumeRepo resumeRepo;

    public String addJob(JobForm jobForm) {
        jobFormRepo.save(jobForm);
        return "Job Posted Successfully";
    }

    public List<JobForm> jobList(String pub) {

        return jobFormRepo.findAllByPublisherId(pub);
    }

    public List<SubscribedJobs> subscribedJobs(int jobId) {
        return subscribedJobRepo.findAllByJobId(jobId);
    }

    public String applyjob(JobApply jobApply) throws NotFound {

        Optional<Resume> resume = resumeRepo.findByUserId(jobApply.getUserId());
        if(resume.isPresent()){
            SubscribedJobs subscribedJobs = subscribedJobRepo.findByJobIdAndUserId(jobApply.getJobId(),jobApply.getUserId());
            if(subscribedJobs!=null)
            {
                throw new NotFound("Already Applied");
            }
            SubscribedJobs subscribedJobs1=new SubscribedJobs(jobApply.getJobId(),jobApply.getUserId());
            subscribedJobRepo.save(subscribedJobs1);
            return "Successfully applied for this Job";
        }else {
            throw new NotFound("Upload Resume First");
        }

    }

    public List<JobForm> jobLists() {
        return jobFormRepo.findAll();}
}
