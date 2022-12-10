package com.stackroute.apigateway.security;


import com.stackroute.apigateway.ExceptionHandler.NotFound;
import com.stackroute.apigateway.config.JwtConfig;
import com.stackroute.apigateway.models.ErrorResponseDto;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
import org.springframework.util.SerializationUtils;
import reactor.core.publisher.Flux;

import java.util.*;


@RefreshScope
@Component
@Slf4j
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

	@Autowired
	private final RouterValidator routerValidator;
	private final JwtTokenUtil jwtTokenUtil;
	private final JwtConfig jwtConfig;

	public AuthenticationFilter(RouterValidator routerValidator, JwtTokenUtil jwtTokenUtil, JwtConfig config) {
		super(Config.class);
		this.routerValidator = routerValidator;
		this.jwtTokenUtil = jwtTokenUtil;
		this.jwtConfig = config;
	}

	@Override
	public GatewayFilter apply(Config config) {
		return ((exchange, chain) -> {

			if (routerValidator.isSecured.test(exchange.getRequest()) && !jwtConfig.isAuthDisabled()) {
//			     ServerHttpResponse response1 = exchange.getResponse();
//				 System.out.print(exchange.getRequest().getURI().toString());

				if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
					throw new RuntimeException("Missing Authorisation Header");
				}

				String authHeader = Objects.requireNonNull(exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION)).get(0);
				try {
					jwtTokenUtil.validateToken(authHeader);

					String[] parts = authHeader.split(" "); // Removing Bearer
					String[] token = parts[1].split("\\.");  //Token in 3 parts

					JSONObject payload = new JSONObject(decode(token[1]));
                    String role = payload.getString("role");

					if (role.equals("user")){
						if (!routerValidator.isMerchant.test(exchange.getRequest())){
                                throw new NotFound("You are not Authorised");
						}

					}
				}
				catch (Exception ex) {
					log.error("Error Validating Authentication Header", ex);
					List<String> details = new ArrayList<>();
					details.add(ex.getLocalizedMessage());
					ErrorResponseDto error = new ErrorResponseDto(new Date(), HttpStatus.UNAUTHORIZED.value(), "UNAUTHORIZED", details, exchange.getRequest().getURI().toString());
					ServerHttpResponse response = exchange.getResponse();

					byte[] bytes = SerializationUtils.serialize(error);

					DataBuffer buffer = exchange.getResponse().bufferFactory().wrap(bytes);
					response.writeWith(Flux.just(buffer));
					response.setStatusCode(HttpStatus.UNAUTHORIZED);
					return response.setComplete();
				}
			}

			return chain.filter(exchange);
		});
	}

	public static class Config {
	}

	private static String decode(String encodedString) {
		return new String(Base64.getUrlDecoder().decode(encodedString));
	}

}