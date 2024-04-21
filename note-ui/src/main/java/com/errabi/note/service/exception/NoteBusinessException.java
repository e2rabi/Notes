package com.errabi.note.service.exception;

public class NoteBusinessException extends RuntimeException {
    private String errorCode;
    private String message;

    public NoteBusinessException() {
    }
    public NoteBusinessException(String errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
    }

    public String getErrorCode() {
        return errorCode;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
