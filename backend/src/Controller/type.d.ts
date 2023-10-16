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

export interface IQuery {
  limit: string;
  offset: string;
}
