package com.mvp.userprofileservice.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Data
@Entity
@NoArgsConstructor
public class Resume {
   @Id
    String userId;
    String fileName;
    String fileType;
    @Lob
    byte[] resumeData;

    public Resume(String userId, String fileName, String fileType, byte[] resumeData) {
        this.userId = userId;
        this.fileName = fileName;
        this.fileType = fileType;
        this.resumeData = resumeData;
    }


}
