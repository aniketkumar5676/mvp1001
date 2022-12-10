package com.stackroute.giftcardservice.service;

import com.stackroute.giftcardservice.ExceptionHandler.NotFound;
import com.stackroute.giftcardservice.dto.Payment;
import com.stackroute.giftcardservice.entity.GiftCard;
import com.stackroute.giftcardservice.entity.IssuedGiftCard;
import com.stackroute.giftcardservice.repository.GiftCardRepository;
import com.stackroute.giftcardservice.repository.IssuedGiftCardJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GiftCardService {

    @Autowired
    private GiftCardRepository giftCardRepository;

    @Autowired
    private IssuedGiftCardJPA issuedGiftCardJPA;

    public List<GiftCard> getGiftCards() {
        return giftCardRepository.findAll();
    }

    public GiftCard getGiftCardsByCategory(String giftId) {
        GiftCard giftCard = giftCardRepository.findByGiftCardId(giftId);
        return giftCard;
    }


    public void createGiftCardNo(Payment payment) {
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        StringBuilder sb = new StringBuilder(12);
        for (int i = 0; i < 12; i++) {
            int index
                    = (int)(AlphaNumericString.length()
                    * Math.random());
            sb.append(AlphaNumericString
                    .charAt(index));
        }

        String uniqueGiftCard= sb.toString().toUpperCase().replaceAll("(.{4})(?!$)", "$1-");

        IssuedGiftCard issuedGiftCard = IssuedGiftCard.build(payment.getOrderId(), payment.getEmail(), payment.getGiftCardName(),
                                                            uniqueGiftCard,payment.getDate(),payment.getAmount());
        issuedGiftCardJPA.save(issuedGiftCard);

        GiftCard giftCard = giftCardRepository.findByGiftCardId(payment.getGiftCardId());
        giftCard.setGiftCardQty(giftCard.getGiftCardQty()-1);

        giftCardRepository.save(giftCard);

     }

    public List<IssuedGiftCard> getGiftCardNo(String email) {
        return issuedGiftCardJPA.findAllByEmail(email);
    }
    
    public List<GiftCard> getCardByMerchantId(String merchantId){
        return giftCardRepository.findByMerchantId( merchantId);
    }

    public String delete(String giftcardid) throws NotFound {
        GiftCard giftCard = giftCardRepository.findByGiftCardId(giftcardid);
        if(giftCard!=null)
        {
            giftCardRepository.delete(giftCard);
            return "Successfully Deleted";
        }else{
            throw new NotFound("Not Exists");
        }

    }

    public GiftCard addCards(GiftCard giftCard) throws NotFound {

        GiftCard giftCard1 = giftCardRepository.findByGiftCardId(giftCard.getGiftCardId());
        if(giftCard1!=null)
        {
            throw new NotFound("Enter Different Giftcard Id");
        }

        return giftCardRepository.save(giftCard);
    }
}

