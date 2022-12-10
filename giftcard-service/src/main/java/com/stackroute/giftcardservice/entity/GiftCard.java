package com.stackroute.giftcardservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "giftcard_tbl")
@AllArgsConstructor
@NoArgsConstructor
public class GiftCard {

    @Id
    private String giftCardId;
    private String giftCardName;
    private double giftCardPrice;
    private int giftCardQty;
    private String merchantId;
    private String merchantName;
    private String giftCardCategory;
    private String image;
    
}
