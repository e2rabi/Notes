  drop sequence if exists users_seq ;
  drop sequence if exists note_seq ;
  create sequence users_seq start with 1 increment by 1 ;
  create sequence note_seq start with 1 increment by 1 ;
