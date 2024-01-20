package com.errabi.note.service.mapper;

import com.errabi.note.entities.Note;
import com.errabi.note.service.model.NoteDto;
import org.mapstruct.Mapper;

@Mapper
public interface NoteMapper {
    Note toEntity(NoteDto dto);
    NoteDto toModel(Note note);
}
