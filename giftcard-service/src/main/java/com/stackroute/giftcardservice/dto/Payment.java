package com.stackroute.giftcardservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigInteger;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

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

}