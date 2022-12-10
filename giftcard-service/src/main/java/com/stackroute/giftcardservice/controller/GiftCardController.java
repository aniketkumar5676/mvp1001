package com.stackroute.giftcardservice.controller;

import com.stackroute.giftcardservice.ExceptionHandler.NotFound;
import com.stackroute.giftcardservice.dto.Payment;
import com.stackroute.giftcardservice.entity.GiftCard;
import com.stackroute.giftcardservice.entity.IssuedGiftCard;
import com.stackroute.giftcardservice.repository.GiftCardRepository;
import com.stackroute.giftcardservice.service.GiftCardService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gift")
@CrossOrigin(origins = "*")
public class GiftCardController {

    @Autowired
    private GiftCardService giftCardService;

    @Autowired
    private GiftCardRepository giftCardRepository;

    @GetMapping("/getGiftCards")
    public List<GiftCard> getGiftCards() {
        return giftCardService.getGiftCards();
    }

    @RabbitListener(queues = "paymentQueue" ,messageConverter = "converter")
    public void giftCardGenerate(Payment payment){
         giftCardService.createGiftCardNo(payment);
    }

    @GetMapping ("/getGiftCardsCount/{giftId}")
    public ResponseEntity <GiftCard> getGiftCardsCount(@PathVariable String giftId)  {
        return ResponseEntity.ok(giftCardService.getGiftCardsByCategory(giftId));
    }

    @GetMapping("/getGiftCard/{email}")
    public List<IssuedGiftCard> getGiftCardNo(@PathVariable String email){
        return giftCardService.getGiftCardNo(email);
    }

    @PostMapping("/addCards")
    public GiftCard addCards(@RequestBody GiftCard giftCard) throws NotFound {


        return giftCardService.addCards(giftCard);

    }

    @GetMapping("/getCardByMerchantid/{merchantId}")
    public List<GiftCard> getCarByMerchantId(@PathVariable String merchantId){
        return giftCardService.getCardByMerchantId(merchantId);
    }


    @DeleteMapping("/delete/{giftcardid}")
    public String delete(@PathVariable String giftcardid) throws NotFound {
        return giftCardService.delete(giftcardid);
    }

}
