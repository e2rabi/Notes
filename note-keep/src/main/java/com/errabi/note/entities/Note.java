package com.errabi.note.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicUpdate;

@Slf4j
@Data
@Entity
@DynamicUpdate // for merge operation update only modified fields
@Table(name = "note")
@EqualsAndHashCode(callSuper=false)
public class Note extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long noteId;
    private String name;
    private String description;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "userId")
    private User user ;
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinColumn(referencedColumnName = "labelId")
    private Label label ;
}
