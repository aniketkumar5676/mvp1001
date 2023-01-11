package com.stackroute.apigateway.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Data
public class AuthenticationStatus {
    private Boolean isAuthenticated;
    private String message;
    private String userId;
    private String username;
    private String emailId;
    private String contact_no;
    private String role;

}
