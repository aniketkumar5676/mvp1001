package com.mvp.userprofileservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor(staticName = "build")
public class JobForm {
    @Id
    @GenericGenerator(name = "id", strategy = "com.mvp.userprofileservice.entity.IdGenerator")
    @GeneratedValue(generator = "id")
    String id;
    String publisherId;
    String jobtitle;
    String jobtype;
    String jobrole;
    String salary;
    String experience;
    String city;
    @Size(max = 1337)
    String qualification;
    @Size(max = 1337)
    String description;
    String date;
    String noofvacancy;
    boolean listed ;
}
