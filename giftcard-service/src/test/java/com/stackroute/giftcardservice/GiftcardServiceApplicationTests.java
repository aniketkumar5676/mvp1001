package com.stackroute.giftcardservice;

import com.stackroute.giftcardservice.entity.GiftCard;
import com.stackroute.giftcardservice.repository.GiftCardRepository;
import com.stackroute.giftcardservice.service.GiftCardService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
class GiftcardServiceApplicationTests {


	@Autowired
	GiftCardService giftCardService;
	@MockBean
	GiftCardRepository giftCardRepository;

	@Test
	public void getGiftCardsTest() {
		when(giftCardRepository.findAll()).thenReturn(Stream
				.of(new GiftCard("376", "Danile", 31, 55,
								"demo","demo","cat","image.jpg"),
						new GiftCard("375", "Danile", 31, 55,
								"demo","demo","cat","image.jpg")).collect(Collectors.toList()));

		assertEquals(2, giftCardService.getGiftCards().size());
	}

	@Test
	public void getGiftCardsByCategoryTest() {
		String id = "123";
		GiftCard giftCard = new GiftCard("123", "Danile", 31, 55,
				"demo","demo","cat","image.jpg");
		when(giftCardRepository.findByGiftCardId(id))
				.thenReturn(giftCard);
		assertEquals(giftCard, giftCardService.getGiftCardsByCategory("123"));
		//verify(giftCardRepository,times(1));
	}


	@Test
	public void deleteTest() {
		GiftCard giftCard = new GiftCard("123", "Danile", 31, 55,
				"demo","demo","cat","image.jpg");
		giftCardRepository.delete(giftCard);
		verify(giftCardRepository, times(1)).delete(giftCard);
	}






}
