package com.stackroute.giftcardservice;

import com.stackroute.giftcardservice.entity.GiftCard;
import com.stackroute.giftcardservice.repository.GiftCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

import javax.annotation.PostConstruct;
import java.net.http.HttpClient;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
@EnableEurekaClient
public class GiftcardServiceApplication {
	@Autowired
	private GiftCardRepository giftCardRepository;
	@PostConstruct
	public void merchants(){
		List<GiftCard> giftCards = Stream.of(
				new GiftCard("56TGET","Amazon",1500,5,"101","ThePaperGift","Shopping","https://i.imgur.com/M3Mjxz9.png"),
				new GiftCard("7UTFHF","Digital Store",5000,5,"101","FunCherish","Shopping","https://i.imgur.com/pAaEbjN.png"),
				new GiftCard("VBFFEG","Amazon",3400,5,"101","GiftPagePrint","Shopping","https://i.imgur.com/M3Mjxz9.png"),
				new GiftCard("334GLH","Flipkart",2000,5,"101","ThePaperGift","Shopping","https://i.imgur.com/M3Mjxz9.png"),
				new GiftCard("667TTF","Flipkart",1599,5,"101","CardCyber","Shopping","https://i.imgur.com/j5pYdJB.png"),
				new GiftCard("556YHT","Reliance store",1999,10,"102","ThePaperGift","Shopping","https://i.imgur.com/whjaOk6.png"),
				new GiftCard("QQW233","Myntra",1250,10,"102","GiftUltra","Fashion","https://i.imgur.com/x70WFch.png"),
				new GiftCard("KKI87Y","Ajio",1250,10,"102","CardCyber","Fashion","https://i.imgur.com/x70WFch.png"),
				new GiftCard("BBG34D","Bewakoof",2250,10,"102","GiftPagePrint","Fashion","https://i.imgur.com/x70WFch.png"),
				new GiftCard("CDR6YR","Amazon Fashion",1500,5,"101","CardCyber","Fashion","https://i.imgur.com/M3Mjxz9.png"),
				new GiftCard("MJ723E","Book My Show",500,5,"101","ThePaperGift","Entertainment","https://i.imgur.com/whjaOk6.png"),
				new GiftCard("HGT67Y","Book My Show",500,5,"101","CardCyber","Entertainment","https://i.imgur.com/j5pYdJB.png"),
				new GiftCard("SDE345","PVR",1000,10,"102","MemoryHadya","Entertainment","https://i.imgur.com/whjaOk6.png"),
				new GiftCard("LOPI98","P&M Cinema",1000,10,"102","FlockGift","Entertainment","https://i.imgur.com/pAaEbjN.png")
		).collect(Collectors.toList());
		giftCardRepository.saveAll(giftCards);
	}
	public static void main(String[] args) { SpringApplication.run(GiftcardServiceApplication.class, args);}


}

