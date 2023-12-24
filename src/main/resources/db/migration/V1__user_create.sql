  drop table if exists users cascade ;
      create table users (
          user_id uuid not null,
          email varchar(255),
          password varchar(255),
          profile_picture varchar(255),
          username varchar(255),
          version number,
          primary key (user_id)
);