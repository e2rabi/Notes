package com.errabi.note.service.mapper;

import com.errabi.note.entities.User;
import com.errabi.note.service.model.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(uses = {NoteMapper.class},unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    User toEntity (UserDto userDto);
    UserDto toModel(User user);

}
