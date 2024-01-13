 create table note (
        version integer not null,
        created timestamp(6),
        label_id bigint,
        last_modified timestamp(6),
        note_id bigint not null,
        user_id bigint,
        created_by varchar(255),
        description varchar(255),
        last_modified_by varchar(255),
        name varchar(255),
        primary key (note_id)
 );
 alter table if exists note
       add constraint FK1a1q3g92a05l7l1winct6xahw
       foreign key (user_id)
       references users;
 alter table if exists note
       add constraint FKlh2sim636efkdye8e530lftiy
       foreign key (label_id)
       references label;
