package com.stackroute.paymentservice.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigInteger;

@Entity
@Table(name = "payment_table")
@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
@Component
public class Payment {
    @Id
    String orderId;
    String email;
    String customerName;
    String phoneNumber;
    String giftCardName;
    String giftCardId;
    String merchantName;
    BigInteger amount;
    String description;
    String Date;
    String status;
    String merchantId;
}