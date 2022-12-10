package com.stackroute.userprofileservice;

import com.stackroute.userprofileservice.ExceptionHandler.NotFound;
import com.stackroute.userprofileservice.entity.UserCredentials;
import com.stackroute.userprofileservice.repo.UserCrediantialRepo;
import com.stackroute.userprofileservice.services.RegisterService;
import org.junit.jupiter.api.Test;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


@SpringBootTest
class UserProfileServiceApplicationTests {

	@Autowired
	private RegisterService registerService;
	@MockBean
	private UserCrediantialRepo userCrediantialRepo;

	@Test
	    public void addUserTest() throws NotFound {
		UserCredentials user =new UserCredentials("rahul56","Aniket Kumar","Aniket@1234","rahul4556@gmail.com","9987898876",
				"Jamalpur","Mgr","ind","877676","user","565555GGTDGDGST3");
		try{
			userCrediantialRepo.save(user);
		}catch(Exception e)
		{
			System.out.print(e.getLocalizedMessage());
		}
		verify(userCrediantialRepo,times(1)).save(user);
	}

}
