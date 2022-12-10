package com.stackroute.giftcardservice.entity;

import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigInteger;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor(staticName = "build")
public class IssuedGiftCard {
    @Id
    String orderId;
    String email;
    String giftCardName;
    String issuedGiftCardNo;
    String issuedDate;
    BigInteger amount;
}
