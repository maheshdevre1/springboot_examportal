package com.exam.helper;

public class UserFoundException extends Exception {

    private String errorCode;

    public UserFoundException() {
        super("User with this Username is already there in DB !! try with another one");
        this.errorCode = "1";
    }

    public UserFoundException(String msg, String errorCode) {
        super(msg);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}

