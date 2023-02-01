package com.mvp.userprofileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class UserInfo {
    @NotBlank(message = "Wrong Format") @Pattern(regexp = "^[a-z\\d\\.]{5,}$")
    String userId;
    @NotBlank(message = "Not Blank")
    String username;
    @NotBlank(message = "Wrong Format") @Email
    String email_id;
    String alternativeEmailId;
    @NotBlank(message = "Wrong Format")  @Pattern(regexp = "[0-9]+")
    String contact_no;
    String alternativeContactNo;
    String address;
}

