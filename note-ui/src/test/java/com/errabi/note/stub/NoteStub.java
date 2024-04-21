package com.errabi.note.stub;

import com.errabi.note.service.model.NoteDto;

public class NoteStub {
    public static NoteDto getNote(){
      return   NoteDto.builder()
              .name("Note")
              .description("Note description")
              .build();
    }
}
