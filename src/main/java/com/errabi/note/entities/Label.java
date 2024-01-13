package com.errabi.note.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicUpdate;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Data
@Entity
@DynamicUpdate // for merge operation update only modified fields
@Table(name = "label")
public class Label extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long labelId;
    private String name ;
    private String description ;
    @OneToMany(mappedBy = "label",fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    private Set<Note> notes = new HashSet<>();

    public void addNote(Note note){
        this.notes.add(note);
        note.setLabel(this);
    }
    public void removeNote(Note note){
        this.notes.remove(note);
        note.setLabel(null);
    }
}
