package com.stackroute.paymentservice.Controller;

import com.stackroute.paymentservice.Entity.Payment;
import com.stackroute.paymentservice.Service.PaymentService;
import com.stackroute.paymentservice.config.MessageConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @PostMapping("/onSuccess")
    public Payment savePaymentOnSuccess(@RequestBody Payment payment){
        payment.setDate(String.valueOf(LocalDate.now()));
        rabbitTemplate.convertAndSend(MessageConfig.PAYMENT_EXCHANGE,MessageConfig.PAYMENT_KEY,payment);
        return paymentService.savePaymentOnSuccess(payment);
    }

    @PostMapping("/onFailure")
    public Payment savePaymentOnFailure(@RequestBody Payment payment){
        return paymentService.savePaymentOnFailure(payment);
    }

    @GetMapping("/listOfPayments")
    public List<Payment> seeAllPayments(){
        return paymentService.seeAllPayments();
    }

    @GetMapping("/custEmail/{email}")
    public List<Payment> findByCustName(@PathVariable String email){
        return paymentService.findByCustEmail(email);
    }

    @GetMapping("/order/{orderId}")
    public Payment findByorderId(@PathVariable String orderId){
        return paymentService.findByorderId(orderId);
    }


    @GetMapping("/sales/{merchantId}")
    public List<Payment> sales(@PathVariable String merchantId){
        return paymentService.findBymerchantId(merchantId);
    }

}

