package com.stackroute.apigateway.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


import com.stackroute.apigateway.config.JwtConfig;
import com.stackroute.apigateway.exception.JwtTokenIncorrectStructureException;
import com.stackroute.apigateway.exception.JwtTokenMalformedException;
import com.stackroute.apigateway.exception.JwtTokenMissingException;
import com.stackroute.apigateway.models.AuthenticationStatus;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenUtil {

	private final JwtConfig config;

	public JwtTokenUtil(JwtConfig config) {
		this.config = config;
	}

	public String generateToken(AuthenticationStatus status) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("sub", status.getUserId());
		claims.put("username",status.getUsername());
		claims.put("role",status.getRole());

		long nowMillis = System.currentTimeMillis();
		long expMillis = nowMillis + config.getValidity() * 1000 * 60;
		Date exp = new Date(expMillis);
		return Jwts.builder().setClaims(claims).setSubject(status.getUserId()).setIssuedAt(new Date(nowMillis)).setExpiration(exp)
				.signWith(SignatureAlgorithm.HS512, config.getSecret()).compact();
	}

	public void validateToken(final String header) throws JwtTokenMalformedException, JwtTokenMissingException {
		try {
			String[] parts = header.split(" ");
			if (parts.length != 2 || !"Bearer".equals(parts[0])) {
				throw new JwtTokenIncorrectStructureException("Incorrect Authentication Structure");
			}

			Jwts.parser().setSigningKey(config.getSecret()).parseClaimsJws(parts[1]);
		} catch (SignatureException ex) {
			throw new JwtTokenMalformedException("Invalid JWT signature");
		} catch (MalformedJwtException ex) {
			throw new JwtTokenMalformedException("Invalid JWT token");
		} catch (ExpiredJwtException ex) {
			throw new JwtTokenMalformedException("Expired JWT token");
		} catch (UnsupportedJwtException ex) {
			throw new JwtTokenMalformedException("Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
			throw new JwtTokenMissingException("JWT claims string is empty.");
		}
	}

}
