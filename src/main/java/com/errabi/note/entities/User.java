package com.errabi.note.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
@Slf4j
@Data
@Entity
@DynamicUpdate // for merge operation update only modified fields
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long userId;
    private String username;
    private String email;
    private String password;
    private String profilePicture ;
    @CreatedDate
    private LocalDateTime created ;
    @LastModifiedDate
    private LocalDateTime lastModified ;
    @CreatedBy
    private String createdBy ;
    @LastModifiedBy
    private String lastModifiedBy ;
    @Version
    private int version ;
    @PostRemove
    public void postRemove(){
        log.warn("deleted user id {}",this.userId);
    }
}