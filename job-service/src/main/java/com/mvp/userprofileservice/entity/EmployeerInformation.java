package com.mvp.userprofileservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor(staticName = "build")
public class EmployeerInformation {

    @Id
    String employerId;
    String employeeName;
    String password;
    String emailId;
    String contact_no;
    String address;
    String role;
}
