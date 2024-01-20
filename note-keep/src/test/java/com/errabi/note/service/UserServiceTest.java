package com.errabi.note.service;

import com.errabi.note.service.exception.NoteBusinessException;
import com.errabi.note.stub.UserStub;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import static com.errabi.note.service.exception.NoteErrorMessage.USER_NOT_FOUND_MESSAGE;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;


@SpringBootTest
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserServiceTest {

    @Autowired
    private UserService userService ;
    @Test
    @Order(1)
    public void createUser(){

       var createdUser =  userService.save(UserStub.getValidUser());
        Assertions.assertNotNull(createdUser);
        assertEquals(UserStub.getValidUser().getEmail(), createdUser.getEmail());
    }
    @Test
    @Order(2)
    public void getAllUsers(){
       var users =  userService.findAll(PageRequest.of(0,10));
        assertEquals(1,users.getTotalElements());
    }
    @Test
    @Order(3)
    public void getUserByExample(){
        var users =  userService.findUsersByExample(UserStub.getValidUser(),PageRequest.of(0,10));
        assertEquals(1,users.getTotalElements());
        assertEquals(UserStub.getValidUser().getEmail(),users.getContent().get(0).getEmail());
    }
    @Test
    @Order(4)
    public void getNoteOfUser(){
        assertEquals(0,userService.getNotesByUserId(1l).size());
    }
    @Test
    @Order(5)
    public void updateUser(){
        var user = userService.findById(1l);
        user.setEmail("email3@test.com");
        userService.update(user);
        user = userService.findById(1l);
        assertEquals("email3@test.com",user.getEmail());
    }

    @Test
    @Order(6)
    public void findNonExistingUser(){
        Throwable exception = assertThrows(NoteBusinessException.class, () -> userService.findById(2l));
        assertEquals(USER_NOT_FOUND_MESSAGE, exception.getMessage());
    }
    @Test
    @Order(7)
    public void deleteExistingUser(){
        userService.deleteById(1l);
    }
}
