package com.exam.helper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.exam.model.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	 @ExceptionHandler(UserFoundException.class)
	    public ResponseEntity<?> handleUserFoundException(UserFoundException ex) {
	        // Create custom response
	        ErrorResponse errorResponse = new ErrorResponse(ex.getErrorCode(), ex.getMessage());

	        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT); // HTTP 409 Conflict
	    }

}
