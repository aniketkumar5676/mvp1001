package com.stackroute.giftcardservice.repository;

import com.stackroute.giftcardservice.entity.IssuedGiftCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssuedGiftCardJPA extends JpaRepository<IssuedGiftCard,String> {
    List<IssuedGiftCard> findAllByEmail(String email);
}
