import client from './db/config.js';
async function Migration() {
  const mysql = await client();

  const usersTable = await mysql.query(`
  CREATE TABLE IF NOT EXISTS users(
  id int not null AUTO_INCREMENT,
  picture varchar(150) not null,
  username varchar(150) not null,
  role enum("0","1","2") not null DEFAULT "0",
  email varchar(100) not null,
  date DATETIME,
  descText varchar(300),
  PRIMARY KEY (id)
)engine=innodb default charset=utf8;
`);

  const postsTable = await mysql.query(`
CREATE TABLE IF NOT EXISTS posts(
  id int not null AUTO_INCREMENT,
  userId int not null,
  text varchar(500) not null,
  pathMedia varchar(150),
  date DATETIME,
  page enum("react", "feed"),
  approved enum("0","1","2"),
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
)engine=innodb default charset=utf8;`);

  const likesTable = await mysql.query(`
CREATE TABLE IF NOT EXISTS likes(
  id int not null AUTO_INCREMENT,
  postId int not null,
  likedByUserId int not null,
  typeOfLike enum("0","1","2","3"),
  PRIMARY KEY (id),
  FOREIGN KEY (likedByUserId) REFERENCES users(id)
)engine=innodb default charset=utf8;`);

  const commentsTable = await mysql.query(`
CREATE TABLE IF NOT EXISTS comments(
  id int not null AUTO_INCREMENT,
  postId int not null,
  userId int not null,
  comment varchar(500),
  date DATETIME,
  PRIMARY KEY (id),
  FOREIGN KEY (postId) REFERENCES posts(id),
  FOREIGN KEY (userId) REFERENCES users(id)
)engine=innodb default charset=utf8;
`);
  console.log('Migration executada com sucesso');
  return;
}
Migration();
