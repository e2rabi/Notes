package com.errabi.note.service.model;

import lombok.*;
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
    private Set<NoteDto> notes ;
  //  private Set<LabelDto> labels ;
}
