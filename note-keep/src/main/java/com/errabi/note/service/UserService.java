package com.errabi.note.service;

import com.errabi.note.entities.User;
import com.errabi.note.service.exception.NoteBusinessException;
import com.errabi.note.service.exception.NoteErrorCodes;
import com.errabi.note.service.mapper.NoteMapper;
import com.errabi.note.service.mapper.UserMapper;
import com.errabi.note.service.model.NoteDto;
import com.errabi.note.service.model.UserDto;
import com.errabi.note.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.errabi.note.service.exception.NoteErrorMessage.USER_NOT_FOUND_MESSAGE;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper mapper ;
    private final NoteMapper noteMapper;
    @Transactional
    public UserDto save(UserDto userDto){
        var createdUser =  userRepository.save(mapper.toEntity(userDto));
        return mapper.toModel(createdUser);
    }
    @Transactional(readOnly = true) // avoid automatic dirty check and snapshot copy
    public UserDto findById(Long userId)  {
        return userRepository.findById(userId)
                .map(mapper::toModel)
                .orElseThrow(()->new NoteBusinessException(NoteErrorCodes.USER_NOT_FOUND_ERROR_CODE,USER_NOT_FOUND_MESSAGE));

    }
    @Transactional(readOnly = true)
    public Page<UserDto> findAll(Pageable page){
       return userRepository.findAll(PageRequest.of(page.getPageNumber(),page.getPageSize(),Sort.by("username")))
                            .map(mapper::toModel);
    }
    @Transactional
    public void deleteById(Long userId){
        var existUser =  userRepository.findById(userId)
                .orElseThrow(()->new NoteBusinessException(NoteErrorCodes.USER_NOT_FOUND_ERROR_CODE,USER_NOT_FOUND_MESSAGE));
        userRepository.deleteById(existUser.getUserId());
    }
    @Transactional
    public void update(UserDto replacementUser){
        var existingUser =  userRepository.findById(replacementUser.getUserId())
                .orElseThrow(()->new NoteBusinessException(NoteErrorCodes.USER_NOT_FOUND_ERROR_CODE,USER_NOT_FOUND_MESSAGE));
        BeanUtils.copyProperties(replacementUser,existingUser);
        userRepository.save(existingUser);
    }
    @Transactional(readOnly = true)
    public Page<UserDto> findUsersByExample(UserDto userQuery, Pageable page){
        var user = mapper.toEntity(userQuery);
        ExampleMatcher exampleMatcher = ExampleMatcher.matching()
                                                      .withIgnorePaths("userId")
                                                      .withIgnoreCase();
        Example<User> userExample = Example.of(user,exampleMatcher);
        return userRepository.findAll(userExample,PageRequest.of(page.getPageNumber(),page.getPageSize()))
                             .map(mapper::toModel);
    }
    @Transactional(readOnly = true)
    public List<NoteDto> getNotesByUserId(Long userId){
         User user =  userRepository.findById(userId)
                 .orElseThrow(()->new NoteBusinessException(NoteErrorCodes.USER_NOT_FOUND_ERROR_CODE,USER_NOT_FOUND_MESSAGE));

        return user.getNotes().stream()
                 .map(noteMapper::toModel)
                 .toList();
    }
}
