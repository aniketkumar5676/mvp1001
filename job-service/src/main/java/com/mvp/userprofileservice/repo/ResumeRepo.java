package com.mvp.userprofileservice.repo;

import com.mvp.userprofileservice.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeRepo extends JpaRepository<Resume,String> {
    Optional<Resume> findByUserId(String userId);

}
