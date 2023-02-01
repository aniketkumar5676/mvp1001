package com.mvp.userprofileservice.services;

import com.mvp.userprofileservice.ExceptionHandler.NotFound;
import com.mvp.userprofileservice.dto.RegisterDto;
import com.mvp.userprofileservice.entity.EmployeerInformation;
import com.mvp.userprofileservice.entity.InstituteInfo;
import com.mvp.userprofileservice.entity.UserCredentials;
import com.mvp.userprofileservice.repo.EmployerRepo;
import com.mvp.userprofileservice.repo.InstituteRepo;
import com.mvp.userprofileservice.repo.UserCrediantialRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class RegisterService {
    @Autowired
    UserCrediantialRepo userCrediantialRepo;

    @Autowired
    EmployerRepo employerRepo;
    @Autowired
    InstituteRepo instituteRepo;

    public String addUser(RegisterDto registerDto) throws NotFound {

        // for User or Normal JobSeeker

        if(registerDto.getRole().equals("User")){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String passwordEncoded = passwordEncoder.encode(registerDto.getPassword());
        registerDto.setPassword(passwordEncoded);

        if( userCrediantialRepo.findByUserId(registerDto.getUserId())!=null ||
                userCrediantialRepo.findByEmailId(registerDto.getEmailId()) != null){
            throw new NotFound("User Already Exists");
        }
        userCrediantialRepo.save(UserCredentials.build(registerDto.getUserId(),registerDto.getUsername(),registerDto.getPassword()
        ,registerDto.getEmailId(), registerDto.getAlternativeEmailId(),
                registerDto.getContact_no(), registerDto.getAlternativeContactNo(), registerDto.getAddress(),registerDto.getRole()));
        return "User Successfully Registered to Us";

        }

        if(registerDto.getRole().equals("Employee")){
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String passwordEncoded = passwordEncoder.encode(registerDto.getPassword());
            registerDto.setPassword(passwordEncoded);

            if( employerRepo.findByEmployerId(registerDto.getUserId())!=null ||
                    employerRepo.findByEmailId(registerDto.getEmailId()) != null){
                throw new NotFound("Employeer Already Exists");
            }
            employerRepo.save(EmployeerInformation.build(registerDto.getUserId(),registerDto.getUsername(),registerDto.getPassword()
                    ,registerDto.getEmailId(), registerDto.getAlternativeEmailId(), registerDto.getContact_no(),
                    registerDto.getAlternativeContactNo(),registerDto.getAddress(),registerDto.getRole()));
            return "Employee Successfully Registered to Us";

        }


        if(registerDto.getRole().equals("Institute")){
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String passwordEncoded = passwordEncoder.encode(registerDto.getPassword());
            registerDto.setPassword(passwordEncoded);

            if( instituteRepo.findByInstituteId(registerDto.getUserId())!=null ||
                    instituteRepo.findByEmailId(registerDto.getEmailId()) != null){
                throw new NotFound("Institute Already Exists");
            }
            instituteRepo.save(InstituteInfo.build(registerDto.getUserId(),registerDto.getUsername(),registerDto.getPassword()
                    ,registerDto.getEmailId(),registerDto.getContact_no(),registerDto.getAddress(),registerDto.getRole()));

            return "Institute Successfully Registered to Us";
        }

        throw new NotFound("Something Went Wrong");

    }



}
