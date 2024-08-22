drop table if exists Users;
create table if not exists Users (
  id integer primary key,
  uuid string not null unique,
  username string not null unique,
  bcrypt string,
  role integer,
  createdOn datetime,
  updatedOn datetime
);