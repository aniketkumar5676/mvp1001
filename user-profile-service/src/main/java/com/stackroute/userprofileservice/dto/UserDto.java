package com.stackroute.userprofileservice.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class UserDto {
    @NotBlank(message = "Wrong Format")  @Pattern(regexp = "^[a-z\\d\\.]{5,}$")
    String userId;
    @NotBlank(message = "Wrong Format") @Pattern(regexp = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
    String password;
}
