package com.stackroute.apigateway.security;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouterValidator {

    public static final List<String> openApiEndpoints = List.of(
           "/login",
           "/user/addUser",
           "/eureka",
           "/api-docs",
           "/"
    );
    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));



    //Checking Merchant Accessible APis
    public static final List<String> openMerchantApiEndpoints = List.of(
            "/gift/getCardByMerchantid",
            "/gift/delete",
            "/gift/addCards"
    );

    public Predicate<ServerHttpRequest> isMerchant =
            request -> openMerchantApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));

}
