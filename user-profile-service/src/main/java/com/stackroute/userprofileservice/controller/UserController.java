package com.stackroute.userprofileservice.controller;

import com.stackroute.userprofileservice.ExceptionHandler.NotFound;
import com.stackroute.userprofileservice.dto.UserDto;
import com.stackroute.userprofileservice.dto.UserInfo;
import com.stackroute.userprofileservice.entity.UserCredentials;
import com.stackroute.userprofileservice.services.ProfileService;
import com.stackroute.userprofileservice.services.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

        @Autowired
        RegisterService registerService;

        @Autowired
        ProfileService profileService;

        //Registration
        @PostMapping("/addUser")
        public String addUser(@RequestBody @Valid UserCredentials userCredentials) throws NotFound {
         return registerService.addUser(userCredentials);
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
