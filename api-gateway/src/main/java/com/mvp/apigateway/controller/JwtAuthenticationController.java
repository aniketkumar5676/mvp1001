package com.mvp.apigateway.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.mvp.apigateway.ExceptionHandler.NotFound;
import com.mvp.apigateway.models.*;
import com.mvp.apigateway.security.JwtTokenUtil;
import com.mvp.apigateway.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("api")
@CrossOrigin(origins = "*")
public class JwtAuthenticationController {

	@Autowired
	private final JwtTokenUtil jwtTokenUtil;
	@Autowired
	LoginService loginService;

	public JwtAuthenticationController(JwtTokenUtil jwtTokenUtil) {
		this.jwtTokenUtil = jwtTokenUtil;
	}
		@PostMapping("/login")
		public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws NotFound {
		AuthenticationStatus status = loginService.authenticate(authenticationRequest.getUserId(), authenticationRequest.getPassword(),authenticationRequest.getLoginType());

		if (!status.getIsAuthenticated()) {
			List<String> details = new ArrayList<>();
			details.add(status.getMessage());
			ErrorResponseDto error = new ErrorResponseDto(new Date(), HttpStatus.UNAUTHORIZED.value(), "UNAUTHORIZED", details, "uri");
			return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
		}

		final String token = jwtTokenUtil.generateToken(status);
		return ResponseEntity.ok(token);
	}


	@PostMapping("/checkUser")
    public String checkUser(@RequestBody CheckUser user) throws NotFound {
		return loginService.checkUser(user);
	}

	@PostMapping("/updatePass")
	public String updatePass(@RequestBody UpdatePass updatePass) throws NotFound {
		return loginService.updatePass(updatePass);
	}

}
