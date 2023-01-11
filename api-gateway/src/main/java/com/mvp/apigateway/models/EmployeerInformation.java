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

public class EmployeerInformation {

    @Id
    String employerId;
    String employeeName;
    String password;
    String emailId;
    String role;
}
