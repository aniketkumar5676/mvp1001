package com.stackroute.giftcardservice.repository;

import com.stackroute.giftcardservice.entity.GiftCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GiftCardRepository extends JpaRepository<GiftCard,String> {

    List<GiftCard> findByGiftCardCategory(String giftCardCategory);


    GiftCard findByGiftCardId(String giftCardId);

    List<GiftCard> findByMerchantId(String merchantId);



}
