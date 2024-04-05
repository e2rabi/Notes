package com.errabi.note.stub;

import com.errabi.note.service.model.UserDto;

public class UserStub {

    public static UserDto getValidUser(){
        return UserDto.builder()
                 .username("test-user")
                 .email("email@test.Com")
                 .profilePicture("photoBase64")
                 .build();
    }
}
