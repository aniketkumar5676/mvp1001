package com.stackroute.paymentservice.Repository;

import com.stackroute.paymentservice.Entity.Payment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, String> {

    List<Payment> findAllByEmail(String email);

    Payment findByOrderId(String orderId);


    List<Payment> findAllByMerchantId(String merchantId);

    // List<Payment> findByCustName(String customerName);

}
