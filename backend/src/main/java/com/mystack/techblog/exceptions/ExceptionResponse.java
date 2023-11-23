package com.mystack.techblog.exceptions;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ExceptionResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private String url;
    private String method;
    private int status;
    private String message;
    private Date timestamp;
}
