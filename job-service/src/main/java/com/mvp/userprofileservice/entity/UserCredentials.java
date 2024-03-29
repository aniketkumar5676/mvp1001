package com.mvp.userprofileservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.HibernateException;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor(staticName = "build")
public class UserCredentials {
    @Id
    @NotBlank(message = "Wrong Format") @Pattern(regexp = "^[a-z\\d\\.]{5,}$")
    String userId;
    @NotBlank(message = "Not Blank")
    String username;
    @NotBlank(message = "Wrong Format") @Pattern(regexp = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
    String password;
    @NotBlank(message = "Wrong Format") @Email
    String emailId;
    String alternativeEmailId;
    @NotBlank(message = "Wrong Format")  @Pattern(regexp = "[0-9]+")
    String contact_no;
    String alternativeContactNo;
    String address;
    String role;
}
