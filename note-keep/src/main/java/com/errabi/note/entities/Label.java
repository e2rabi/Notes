package com.errabi.note.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Data
@Entity
@DynamicUpdate // for merge operation update only modified fields
@EqualsAndHashCode(callSuper=false)
@Table(name = "label")
public class Label extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long labelId;
    private String name ;
    private String description ;
    @OneToMany(mappedBy = "label",fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    private List<Note> notes = new ArrayList<>();

    public void addNote(Note note){
        this.notes.add(note);
        note.setLabel(this);
    }
    public void removeNote(Note note){
        this.notes.remove(note);
        note.setLabel(null);
    }
}
