package com.errabi.note.service.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoteDto {
    private Long noteId;
    private String name;
    private String description;
    private UserDto user ;
    private LabelDto label ;
}
