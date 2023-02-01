package com.mvp.userprofileservice.services;

import com.mvp.userprofileservice.ExceptionHandler.NotFound;
import com.mvp.userprofileservice.dto.JobAlertApply;
import com.mvp.userprofileservice.dto.JobApply;
import com.mvp.userprofileservice.dto.deleteDto;
import com.mvp.userprofileservice.entity.JobAlert;
import com.mvp.userprofileservice.entity.JobForm;
import com.mvp.userprofileservice.entity.Resume;
import com.mvp.userprofileservice.entity.SubscribedJobs;
import com.mvp.userprofileservice.repo.JobAlertRepo;
import com.mvp.userprofileservice.repo.JobFormRepo;
import com.mvp.userprofileservice.repo.ResumeRepo;
import com.mvp.userprofileservice.repo.SubscribedJobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    @Autowired
    JobAlertRepo jobAlertRepo;

    public String addJob(JobForm jobForm) {
        jobFormRepo.save(jobForm);
        return "Job Posted Successfully";
    }

    public List<JobForm> jobList(String pub) {

        return jobFormRepo.findAllByPublisherId(pub);
    }

    public List<SubscribedJobs> subscribedJobs(String jobId) {
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

    public String deleteJob(deleteDto deletedto) throws NotFound {
        JobForm jobForm = jobFormRepo.findById(deletedto.getJobId());
        if (jobForm!=null) {

           if ((jobForm.getPublisherId()).equals(deletedto.getUserId())){
               jobFormRepo.delete(jobForm);
               return "Deleted Successfully";
           }

        }

        throw  new NotFound("Your are not authorised");
    }

    public String hireHim(JobAlertApply jobApply) throws NotFound {

        JobAlert jobAlertdb = jobAlertRepo.findByJobIdAndUserId(jobApply.getJobId(),jobApply.getUserId());
        if(jobAlertdb!=null){
            throw new NotFound("Hired");
        }
        JobAlert jobAlert = new JobAlert();
        jobAlert.setJobId(jobApply.getJobId());
        jobAlert.setUserId(jobApply.getUserId());
        jobAlert.setJobTitle(jobApply.getJobTitle());
        jobAlert.setDate(LocalDate.now().toString());
        jobAlert.setNotified("0");
        jobAlertRepo.save(jobAlert);
        return "Successfully Hired this Candidate!, Candidate will get notified soon" ;
       }

    public List<JobAlert> allNoti(String id) {
        return jobAlertRepo.findAllByUserId(id);
    }

    public List<JobAlert> allNotificationLength(String id) {
          return jobAlertRepo.findAllByUserIdAndNotified(id,"0");
    }

    public String readallNotification(String id) {
        List<JobAlert> jobalert= jobAlertRepo.findAllByUserId(id);

        for (JobAlert jobAlert : jobalert) {
            jobAlert.setNotified("1");
            jobAlertRepo.save(jobAlert);
        }
        return "Done";
    }
}
