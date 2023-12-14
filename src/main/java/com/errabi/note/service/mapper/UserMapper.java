package com.errabi.note.service.mapper;

import com.errabi.note.entities.User;
import com.errabi.note.service.model.UserDto;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {
    User toEntity (UserDto userDto);
    UserDto toModel(User user);

}
