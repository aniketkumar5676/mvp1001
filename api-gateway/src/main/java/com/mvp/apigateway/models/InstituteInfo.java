package com.mvp.apigateway.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InstituteInfo {
    @Id
    String instituteId;
    String instituteName;
    String password;
    String emailId;
    String role;
}
