package com.mvp.apigateway.ExceptionHandler;

public class NotFound extends  Exception {
    public NotFound(String message) {
        super(message);
    }
}
