package com.mystack.techblog.exceptions.handler;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mystack.techblog.exceptions.BadRequestException;
import com.mystack.techblog.exceptions.ExceptionResponse;
import com.mystack.techblog.exceptions.ResourceNotFoundException;
import com.mystack.techblog.exceptions.UnauthorizedException;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class CustomizedExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public final ResponseEntity<ExceptionResponse> handleAllExceptions(Exception exception, HttpServletRequest request) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(
            request.getRequestURL().toString(),
            request.getMethod(),
            500,
            exception.getMessage(),
            new Date()
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exceptionResponse);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseBody
    public final ResponseEntity<ExceptionResponse> handleResourceNotFoundException(
        Exception exception, HttpServletRequest request
    ) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(
            request.getRequestURL().toString(),
            request.getMethod(),
            404,
            exception.getMessage(),
            new Date()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exceptionResponse);
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseBody
    public final ResponseEntity<ExceptionResponse> handleBadRequestException(
        Exception exception, HttpServletRequest request
    ) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(
            request.getRequestURL().toString(),
            request.getMethod(),
            400,
            exception.getMessage(),
            new Date()
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionResponse);
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseBody
    public final ResponseEntity<ExceptionResponse> handleUnauthorizedException(
        Exception exception, HttpServletRequest request
    ) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(
            request.getRequestURL().toString(),
            request.getMethod(),
            401,
            exception.getMessage(),
            new Date()
        );

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(exceptionResponse);
    }
}
