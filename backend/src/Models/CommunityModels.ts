import ICommunity from "./type.js";
import client from "../db/config.js";

class Community implements ICommunity {
  async getAllFeed(page: string, limit: string, offset: string, user: string) {
    const searchByUser = user !== "undefined" ? "u.username = ?" : "p.page = ?";
    const thereIsUser = user !== "undefined" ? user : page;
    const mysql = await client();
    const query =
      'SELECT p.id, u.picture, u.username, p.text, p.date, u.role, p.page, p.pathMedia, (SELECT COUNT(*) FROM likes AS l1 WHERE l1.postId = p.id AND l1.typeOfLike = "0") AS emote00, (SELECT COUNT(*) FROM likes AS l2 WHERE l2.postId = p.id AND l2.typeOfLike = "1") AS emote01, (SELECT COUNT(*) FROM likes AS l3 WHERE l3.postId = p.id AND l3.typeOfLike = "2") AS emote02, (SELECT COUNT(*) FROM likes AS l4 WHERE l4.postId = p.id AND l4.typeOfLike = "3") AS emote03, (SELECT COUNT(*) FROM comments AS c1 WHERE c1.postId = p.id) AS totalOfComments FROM posts AS p INNER JOIN users AS u ON u.id = p.userId WHERE ' +
      searchByUser +
      ' AND p.approved = "2" GROUP BY p.id, u.picture, u.username, p.text, p.date, u.role, p.page, p.pathMedia ORDER BY p.id DESC LIMIT ? OFFSET ?;';
    const [row] = await mysql.query(query, [thereIsUser, +limit, +offset]);
    return row;
  }
  async getPostById(postId: string) {
    const mysql = await client();
    const query =
      'SELECT p.id, u.picture, p.page, u.username, p.text, p.pathMedia, p.date, u.role, (SELECT COUNT(*) FROM likes AS l1 WHERE l1.postId = p.id AND l1.typeOfLike = "0") AS emote00, (SELECT COUNT(*) FROM likes AS l2 WHERE l2.postId = p.id AND l2.typeOfLike = "1") AS emote01, (SELECT COUNT(*) FROM likes AS l3 WHERE l3.postId = p.id AND l3.typeOfLike = "2") AS emote02, (SELECT COUNT(*) FROM likes AS l4 WHERE l4.postId = p.id AND l4.typeOfLike = "3") AS emote03, (SELECT COUNT(DISTINCT c1.id) FROM comments AS c1 WHERE c1.postId = p.id) AS totalOfComments FROM posts AS p INNER JOIN users AS u ON u.id = p.userId WHERE p.id = ?;';
    const [row] = await mysql.query(query, [+postId]);
    return row;
  }
  async sendPost(
    userId: number,
    text: string,
    path: string,
    approved: string,
    date: string,
    page: string
  ) {
    const pageLower = page.toLowerCase();
    const mysql = await client();
    const query =
      "INSERT INTO posts(userId, text, pathMedia, approved, date, page) VALUES(?, ?, ?, ?, ?, ?)";
    const row = await mysql.query(query, [
      userId,
      text,
      path,
      approved,
      date,
      pageLower,
    ]);
    return row;
  }
  async likedPost(userId: number, postId: number, typeOfLike: string) {
    const mysql = await client();
    const query =
      "INSERT INTO likes(postId, likedByUserId, typeOfLike) VALUES(?, ?, ?)";
    const row = await mysql.query(query, [postId, userId, typeOfLike]);
    return row;
  }
  async getUserLiked(userId: number, postId: number) {
    const mysql = await client();
    const query = "select * from likes WHERE postId = ? and likedByUserId = ?;";
    const [row] = await mysql.query(query, [postId, userId]);
    return row;
  }
  async getLikedByPost(postId: number) {
    const mysql = await client();
    const query =
      'SELECT SUM(CASE WHEN typeOfLike = "0" THEN 1 ELSE 0 END) AS emote00, SUM(CASE WHEN typeOfLike = "1" THEN 1 ELSE 0 END) AS emote01, SUM(CASE WHEN typeOfLike = "2" THEN 1 ELSE 0 END) AS emote02, SUM(CASE WHEN typeOfLike = "3" THEN 1 ELSE 0 END) AS emote03 FROM likes WHERE postId = ?;';
    const [row] = await mysql.query(query, [postId]);
    return row;
  }
  async updateLike(postId: string, typeOfLike: string, userId: number) {
    const mysql = await client();
    const query =
      "UPDATE likes set typeOfLike = ? where postId = ? and likedByUserId = ? ";
    const [row] = await mysql.query(query, [typeOfLike, postId, userId]);
    return row;
  }
  async commentsPost(userId: number, comment: string, postId: number) {
    const mysql = await client();
    const query =
      "INSERT INTO comments(postId, userId, comment) VALUES(?, ?, ?)";
    const row = await mysql.query(query, [postId, userId, comment]);
    return row;
  }
  async getComments(postId: string) {
    const mysql = await client();
    const query =
      "select c.id, u.username, u.picture, p.pathMedia, c.comment, c.date from comments as c inner join posts as p on c.postId = p.id inner join users as u on c.userId = u.id WHERE p.id = ? ORDER BY c.id desc;";
    const [row] = await mysql.query(query, [postId]);
    return row;
  }
  async postComment(
    userId: number,
    postId: number,
    comment: string,
    date: string
  ) {
    const mysql = await client();
    const query =
      "INSERT INTO comments(postId, userId, comment, date) VALUES(?, ?, ?, ?)";
    const [row] = await mysql.query(query, [postId, userId, comment, date]);
    return row;
  }
  async postListData(limit: number, offset: number) {
    const mysql = await client();
    const query =
      'SELECT p.id, u.username, p.pathMedia, p.text, p.approved, p.date, p.page FROM posts as p inner join users as u on u.id = p.userId WHERE p.approved = "1" and u.role != "1" ORDER BY p.id desc LIMIT ? OFFSET ?;';
    const [row] = await mysql.query(query, [limit, offset]);
    return row;
  }
  async approvedPost(postId: number, approved: number) {
    const mysql = await client();
    const query = "UPDATE posts SET approved = ? WHERE id = ?";
    const row = await mysql.query(query, [approved, postId]);
    return row;
  }
  async searchUser(userName: string, typeOfSearch: string) {
    const mysql = await client();
    const typeSearch = typeOfSearch === "like" ? "LIKE ?" : "= ?";
    const params = typeOfSearch === "like" ? userName + "%" : userName;
    const query = `SELECT u.descText, u.role, u.username,u.picture, COUNT(DISTINCT l.id) AS totalLikes, COUNT(DISTINCT c.id) AS totalComments, COUNT(DISTINCT p.id) AS totalPosts FROM users AS u LEFT JOIN likes AS l ON l.likedByUserId = u.id LEFT JOIN comments AS c ON c.userId = u.id LEFT JOIN posts AS p ON p.userId = u.id WHERE u.username ${typeSearch} GROUP BY u.id, u.username;`;
    const [row] = await mysql.query(query, [params]);
    return row;
  }
  async userList(limit: number, offset: number) {
    const mysql = await client();
    const query =
      "select id, picture, username, date, role from users LIMIT ? OFFSET ?;";
    const [row] = await mysql.query(query, [limit, offset]);
    return row;
  }
  async updateUserList(id: number, role: string) {
    const mysql = await client();
    const query = "UPDATE users SET role = ? WHERE id = ?";
    const [row] = await mysql.query(query, [role, id]);
    return row;
  }
  async getUserByEmailOrUser(emailOrUser: string) {
    const mysql = await client();
    const query =
      "SELECT u.*, COUNT(DISTINCT l.id) AS totalLikes, COUNT(DISTINCT c.id) AS totalComments, COUNT(DISTINCT p.id) AS totalPosts FROM users AS u LEFT JOIN likes AS l ON l.likedByUserId = u.id LEFT JOIN comments AS c ON c.userId = u.id LEFT JOIN posts AS p ON p.userId = u.id WHERE u.username = ? OR u.email = ? GROUP BY u.id, u.username;";
    const [row] = await mysql.query(query, [emailOrUser, emailOrUser]);
    return row;
  }
  async createUser(image: string, name: string, email: string, date: string) {
    const role = "0";
    const mysql = await client();
    const query =
      "INSERT INTO users(picture, username, role, email, date) VALUES(?, ?, ?, ?, ?)";
    const [row] = await mysql.query(query, [image, name, role, email, date]);
    return row;
  }
  async updateDesc(desc: string, userId: string) {
    const role = "0";
    const mysql = await client();
    const query = "UPDATE users set descText = ? WHERE username = ?";
    const [row] = await mysql.query(query, [desc, userId]);
    return row;
  }
}

export default Community;
