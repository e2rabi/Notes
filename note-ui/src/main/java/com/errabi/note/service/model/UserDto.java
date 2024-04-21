package com.errabi.note.service.model;

import lombok.*;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long userId;
    private String username;
    private String email;
    private String profilePicture ;
    private List<NoteDto> notes ;
  //  private Set<LabelDto> labels ;
}
