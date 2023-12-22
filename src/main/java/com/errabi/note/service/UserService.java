package com.errabi.note.service;

import com.errabi.note.entities.User;
import com.errabi.note.service.mapper.UserMapper;
import com.errabi.note.service.model.UserDto;
import com.errabi.note.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper mapper ;

    public UserDto save(UserDto userDto){
        var createdUser =  userRepository.save(mapper.toEntity(userDto));
        return mapper.toModel(createdUser);
    }
    @Transactional(readOnly = true) // avoid automatic dirty check and snapshot copy
    public UserDto findById(Long userId){
        return userRepository.findById(userId)
                .map(mapper::toModel)
                .orElseThrow(()->new RuntimeException("User with id {} not found !"));

    }
    @Transactional(readOnly = true)
    public Page<UserDto> findAll(Pageable page){
       return userRepository.findAll(PageRequest.of(page.getPageNumber(),page.getPageSize(),Sort.by("username")))
                            .map(mapper::toModel);
    }
    public void deleteById(Long id){
        var existUser = findById(id);
        userRepository.deleteById(existUser.getUserId());
    }
    public void update(UserDto replacementUser){
        var existingUser =  findById(replacementUser.getUserId());
        BeanUtils.copyProperties(replacementUser,existingUser);
        userRepository.save(mapper.toEntity(existingUser));
    }
    @Transactional(readOnly = true)
    public Page<UserDto> findByQuery(UserDto userQuery,Pageable page){
        var user = mapper.toEntity(userQuery);
        ExampleMatcher exampleMatcher = ExampleMatcher.matching()
                                                      .withIgnorePaths("userId")
                                                      .withIgnoreCase();
        Example<User> userExample = Example.of(user,exampleMatcher);
        return userRepository.findAll(userExample,PageRequest.of(page.getPageNumber(),page.getPageSize()))
                             .map(mapper::toModel);
    }
}
