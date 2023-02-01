package com.mvp.userprofileservice.controller;

import com.mvp.userprofileservice.ExceptionHandler.NotFound;
import com.mvp.userprofileservice.dto.*;
import com.mvp.userprofileservice.entity.*;
import com.mvp.userprofileservice.services.JobService;
import com.mvp.userprofileservice.services.ProfileService;
import com.mvp.userprofileservice.services.RegisterService;
import com.mvp.userprofileservice.services.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("job")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    RegisterService registerService;

    @Autowired
    ProfileService profileService;

    @Autowired
    JobService jobService;

    @Autowired
    ResumeService resumeService;

    //Registration
    @PostMapping("/addUser")
    public String addUser(@RequestBody RegisterDto registerDto) throws NotFound {
        return registerService.addUser(registerDto);
    }

    @GetMapping("/byUserId/{userId}")
    public UserInfo findByUserUserId(@PathVariable String userId) {
        return profileService.findByUserUserId(userId);
    }

    @GetMapping("/byEmployeeId/{employeeId}")
    public UserInfo findByEmployeeId(@PathVariable String employeeId) {
        return profileService.findByEmployeeId(employeeId);
    }


    @PutMapping("/update")
    public UserCredentials updateById(@RequestBody UserInfo userInfo) throws NotFound {
        return profileService.updateUserDetails(userInfo);
    }

    @PutMapping("/update/employee")
    public EmployeerInformation updateEmployeeById(@RequestBody UserInfo userInfo) throws NotFound {
        return profileService.updateEmployeeById(userInfo);
    }

    //Adding of Job
    @PostMapping("/addJob")
    public String addJob(@RequestBody JobForm jobForm) {
        return jobService.addJob(jobForm);
    }

    //Deletion of Jobs

    @DeleteMapping("/delete/job")
    public String deleteJob(@RequestBody deleteDto deletedto) throws NotFound {
        return jobService.deleteJob(deletedto);
    }

    @GetMapping("/joblist/{pub}")
    public List<JobForm> jobList(@PathVariable String pub) {
        return jobService.jobList(pub);
    }

    @PostMapping("/resume/{userId}")
    public String uploadResume(@RequestPart("file") MultipartFile file, @PathVariable String userId) throws NotFound {
        return resumeService.uploadResume(file, userId);
    }

    @GetMapping("/downloadResume/{userId}")
    public ResponseEntity<Resource> downloadResume(@PathVariable String userId) throws NotFound {
        Resume resume = resumeService.getResume(userId);
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(resume.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "resume_name =\"" + resume.getFileName() + "\"")
                .body(new ByteArrayResource(resume.getResumeData()));
    }

    @GetMapping("/subscribedjobs/{jobId}")
    public List<SubscribedJobs> subscribedJobs(@PathVariable String jobId) {
        return jobService.subscribedJobs(jobId);
    }


    @PostMapping("/apply/job")
    public String applyJob(@RequestBody JobApply jobApply) throws NotFound {
        return jobService.applyjob(jobApply);
    }

    @GetMapping("/jobLists")
    public List<JobForm> jobLists() {
        return jobService.jobLists();
    }


    @PostMapping("/hire")
    public String hireHim(@RequestBody JobAlertApply jobAlertApply ) throws NotFound {
        return jobService.hireHim(jobAlertApply);
    }

    @GetMapping("/allNotification/{id}")
    public List<JobAlert> allNoti(@PathVariable String id){
        return jobService.allNoti(id);
    }

    @GetMapping("/allNotificationLength/{id}")
    public List<JobAlert> allNotificationLength(@PathVariable String id){
        return jobService.allNotificationLength(id);
    }

    @GetMapping("/readallNotification/{id}")
    public String readallNotification(@PathVariable String id){
        return jobService.readallNotification(id);
    }

}
