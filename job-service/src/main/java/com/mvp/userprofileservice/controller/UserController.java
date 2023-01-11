package com.mvp.userprofileservice.controller;

import com.mvp.userprofileservice.ExceptionHandler.NotFound;
import com.mvp.userprofileservice.dto.RegisterDto;
import com.mvp.userprofileservice.dto.UserInfo;
import com.mvp.userprofileservice.entity.UserCredentials;
import com.mvp.userprofileservice.services.ProfileService;
import com.mvp.userprofileservice.services.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "*")
public class UserController {

        @Autowired
        RegisterService registerService;

        @Autowired
        ProfileService profileService;

        //Registration
        @PostMapping("/addUser")
        public String addUser(@RequestBody @Valid RegisterDto registerDto) throws NotFound {
         return registerService.addUser(registerDto);
       }

          @GetMapping("/byUserId/{userId}")
          public UserInfo findByUserUserId(@PathVariable String userId){
            return profileService.findByUserUserId(userId);
          }

          @PutMapping("/update/{userId}")
          public UserCredentials updateById(@RequestBody UserInfo userInfo , @PathVariable String userId) throws NotFound {
            return profileService.updateUserDetails(userInfo,userId);
          }

}
