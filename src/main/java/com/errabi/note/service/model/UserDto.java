package com.errabi.note.service.model;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long userId;
    private String username;
    private String email;
    private String password;
    private String profilePicture ;
}
