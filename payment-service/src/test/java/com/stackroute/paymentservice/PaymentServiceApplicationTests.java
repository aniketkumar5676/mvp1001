package com.stackroute.paymentservice;

import com.stackroute.paymentservice.Entity.Payment;
import com.stackroute.paymentservice.Repository.PaymentRepository;
import com.stackroute.paymentservice.Service.PaymentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
class PaymentServiceApplicationTests {


@Autowired
	private PaymentService paymentService;
@MockBean
private PaymentRepository paymentRepository;


@Test
     public void seeAllPaymentsTest(){

	 when(paymentRepository.findAll()).thenReturn(Stream
					 .of(Payment.build("exampleOrderid", "sample@gmil.com", "demo", "3443454345",
							 "gift555", "3343", "demo", BigInteger.valueOf(464)
							 , "success", "22/02/1998", "done", "3243")).collect(Collectors.toList()));

	assertEquals(1, paymentService.seeAllPayments().size());

}
	@Test
	public void findByCustEamilTest() {
		String eaddress = "aniket@gmail.com";
		when(paymentRepository.findAllByEmail(eaddress))
				.thenReturn(Stream
						.of(Payment.build("exampleOrderid", "aniket@gmail.com", "demo", "3443454345",
								"gift555", "3343", "demo", BigInteger.valueOf(464)
								, "success", "22/02/1998", "done", "3243")).collect(Collectors.toList()));
		assertEquals(1, paymentService.findByCustEmail(eaddress).size());
	}





}
