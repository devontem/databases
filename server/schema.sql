CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  username varchar(30),
  message varchar(140),
  roomname varchar(30)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
	username varchar(30)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

