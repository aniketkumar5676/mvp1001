package com.mvp.userprofileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Lob;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeResponse {

    String fileName;
    String downloadURL;
    String fileType;
    long fileSize;
}
