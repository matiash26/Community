export interface ICommunity {
  getAllFeed(
    page: string,
    approved: string,
    limit: string,
    offset: string,
  ): void;
  sendPost(
    userId: number,
    text: string,
    path: string,
    approved: string,
    date: string,
    page: string,
  ): void;
  likedPost(userId: number, postId: number, typeOfLike: string): void;
  getUserLiked(userId: number, postId: number): void;
  getLikedByPost(postId: number): void;
  commentsPost(userId: number, comment: string, postId: number): void;
  approvedPost(postId: number, approved: number): void;
  getComments(postId: string): void;
  postListData(limit: number, offset: number): void;
  userList(limit: number, offset: number): void;
  createUser(image: string, name: string, email: string, date: string): void;
  searchUser(userName: string, typeOfSearch: string): void;
  getUserByEmailOrUser(emailOrUser: string): void;
}
export interface IPost {
  id: number;
  picture: string;
  username: string;
  text: string;
  pathMidia: string;
  date: string;
  rule: string;
  emote00: string;
  emote01: string;
  emote02: string;
  emote03: string;
}
export interface ILikes {
  emote00: string;
  emote01: string;
  emote02: string;
  emote03: string;
}
export interface IQuery {
  limit: string;
  offset: string;
}
export interface IComment {
  id: number;
  text: string;
  date: string;
  picture: strig;
  username: string;
  pathMedia: string;
  comment: string;
}

export interface IUser {
  id: number;
  picture: string;
  username: string;
  role: string;
  date: string;
  email: string;
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
  descText: string;
}
export interface ISql {
  affectedRows: number;
}
