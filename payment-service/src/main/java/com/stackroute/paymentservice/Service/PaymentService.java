package com.stackroute.paymentservice.Service;

import com.stackroute.paymentservice.Entity.Payment;
import com.stackroute.paymentservice.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment savePaymentOnSuccess(Payment payment){

        System.out.println(payment);
                Payment payment1 = Payment.build(payment.getOrderId(),payment.getEmail(),payment.getCustomerName(),payment.getPhoneNumber(),
                payment.getGiftCardName(),payment.getGiftCardId(), payment.getMerchantName(),
                payment.getAmount(),payment.getDescription(),payment.getDate(),"Success",payment.getMerchantId());

        return paymentRepository.save(payment1);

    }

    public Payment savePaymentOnFailure(Payment payment){

        payment.setDate(String.valueOf(LocalDate.now()));

        Payment payment2 = Payment.build(payment.getOrderId(),payment.getEmail(),payment.getCustomerName(),payment.getPhoneNumber(),
                payment.getGiftCardName(),payment.getGiftCardId(), payment.getMerchantName(),
                payment.getAmount(),payment.getDescription(),payment.getDate(),"Failure",payment.getMerchantId());
        return paymentRepository.save(payment2);
    }

    public List<Payment> seeAllPayments(){
        return paymentRepository.findAll();
    }
    public List<Payment> findByCustEmail(String email){
        return paymentRepository.findAllByEmail(email);

    }

    public Payment findByorderId(String orderId) {
        return paymentRepository.findByOrderId(orderId);
    }

    public List<Payment> findBymerchantId(String merchantId) {
        return paymentRepository.findAllByMerchantId(merchantId);
    }
}
