package com.stackroute.apigateway.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.stackroute.apigateway.ExceptionHandler.NotFound;
import com.stackroute.apigateway.models.AuthenticationStatus;
import com.stackroute.apigateway.models.ErrorResponseDto;
import com.stackroute.apigateway.models.JwtRequest;
import com.stackroute.apigateway.security.JwtTokenUtil;
import com.stackroute.apigateway.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@CrossOrigin(origins = "*")
public class JwtAuthenticationController {

	@Autowired
	private final JwtTokenUtil jwtTokenUtil;
	@Autowired
	LoginService loginService;

	public JwtAuthenticationController(JwtTokenUtil jwtTokenUtil) {
		this.jwtTokenUtil = jwtTokenUtil;
	}


	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody @Valid JwtRequest authenticationRequest) throws NotFound {
		AuthenticationStatus status = loginService.authenticate(authenticationRequest.getUserId(), authenticationRequest.getPassword());

		if (!status.getIsAuthenticated()) {
			List<String> details = new ArrayList<>();
			details.add(status.getMessage());
			ErrorResponseDto error = new ErrorResponseDto(new Date(), HttpStatus.UNAUTHORIZED.value(), "UNAUTHORIZED", details, "uri");
			return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
		}

		final String token = jwtTokenUtil.generateToken(status);
		return ResponseEntity.ok(token);
	}


}
