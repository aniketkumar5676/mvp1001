package com.mvp.userprofileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobAlertApply {
    String jobId;
    String userId;
    String jobTitle;
}
