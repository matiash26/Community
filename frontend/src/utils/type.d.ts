import { ReactNode } from 'react';

export interface fileType {
  size: number;
  type: string;
  name: string;
  lastModified: number;
}
export interface IResponse {
  error: boolean;
  message: string;
}

export interface IPost {
  id: number;
  date: string;
  picture: string;
  username: string;
  pathMedia: string;
  userId: number;
  text: string;
  approved: string;
  username: string;
  emote00: string;
  emote01: string;
  emote02: string;
  emote03: string;
  role: string;
  totalOfComments: number;
  page: string;
}
interface IPostResponse extends IResponse {
  data: IPost[];
}
export interface IPostInfo {
  postInf: IPost;
}
export interface IProps {
  postInf: IPost;
  children: ReactNode;
}
interface IComment {
  id: number;
  text: string;
  date: string;
  picture: strig;
  username: string;
  pathMedia: string;
  comment: string;
}
export interface IComments {
  comment: IComment[];
  post: IPost | null;
  error: boolean;
}

interface IPostTable {
  id: number;
  username: string;
  page: string;
  approved: string;
  date: string;
  text: string;
}
interface IUser {
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

interface IUserApi {
  error: boolean;
  search: IUser[];
}
interface ILogin {
  error: boolean;
  data: IUser[];
}
