package com.mvp.userprofileservice.services;

import com.mvp.userprofileservice.ExceptionHandler.NotFound;
import com.mvp.userprofileservice.entity.Resume;
import com.mvp.userprofileservice.repo.ResumeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public class ResumeService {

    @Autowired
    ResumeRepo resumeRepo;



    public String uploadResume(MultipartFile file, String userId) throws NotFound {

       String fileName = StringUtils.cleanPath(file.getOriginalFilename());
       try{
           if(fileName.contains("..")||fileName.equals("")){
               throw new NotFound("File should be properly named (No Special character allowed)");
           }

               Resume resume = new Resume(userId,fileName,file.getContentType(),file.getBytes());
               resumeRepo.save(resume);


           return "Resume Submitted Successfully";
       }catch(Exception e)
       {
           throw new NotFound("Invalid File");
       }
    }

    public Resume getResume(String userId) throws NotFound {
        return resumeRepo.findByUserId(userId).orElseThrow(()->
                new NotFound("File Not Found"));


    }
}
