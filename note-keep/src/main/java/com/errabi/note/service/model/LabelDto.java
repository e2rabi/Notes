package com.errabi.note.service.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LabelDto {
    private Long labelId;
    private String name ;
    private String description ;
}
