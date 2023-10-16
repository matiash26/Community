export default interface ICommunity {
  getAllFeed(
    page: string,
    approved: string,
    limit: string,
    offset: string
  ): void;
  sendPost(
    userId: number,
    text: string,
    path: string,
    approved: string,
    date: string,
    page: string
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
