package com.errabi.note.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.HashSet;
import java.util.Set;

@Slf4j
@Data
@Entity
@DynamicUpdate // for merge operation update only modified fields
@Table(name = "users")
public class User extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long userId;
    private String username;
    private String email;
    private String password;
    private String profilePicture ;
    @OneToMany(mappedBy = "user",cascade = CascadeType.PERSIST,fetch = FetchType.LAZY)
    private Set<Note> notes = new HashSet<>();

    public void addNote(Note note){
        this.notes.add(note);
        note.setUser(this);
    }
    public void removeNote(Note note){
        this.notes.remove(note);
        note.setUser(null);
    }
    @PostRemove
    public void postRemove(){
        log.warn("deleted user id {}",this.userId);
    }
}
