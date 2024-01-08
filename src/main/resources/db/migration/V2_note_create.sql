 create table note (
        version integer not null,
        created timestamp(6),
        last_modified timestamp(6),
        note_id bigint not null,
        user_user_id bigint,
        created_by varchar(255),
        description varchar(255),
        last_modified_by varchar(255),
        name varchar(255),
        primary key (note_id)
);
 alter table if exists note
       add constraint FK1a1q3g92a05l7l1winct6xahw
       foreign key (user_user_id)
       references users;
