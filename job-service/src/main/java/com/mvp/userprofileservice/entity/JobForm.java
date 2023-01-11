package com.mvp.userprofileservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor(staticName = "build")
public class JobForm {
    @Id @GeneratedValue
    int id;
    String publisherId;
    String jobtitle;
    String jobtype;
    String jobrole;
    String salary;
    String experience;
    String city;
    String qualification;
    String description;
    boolean listed ;
}
