  drop sequence if exists users_seq ;
  drop sequence if exists note_seq ;
  drop sequence if exists label_seq;
  create sequence users_seq start with 1 increment by 1 ;
  create sequence note_seq start with 1 increment by 1 ;
  create sequence label_seq start with 1 increment by 1 ;
