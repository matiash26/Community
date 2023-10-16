import type {
  IPost,
  IPostTable,
  IUserApi,
  IUser,
  ILogin,
  IResponse,
} from "./type";
const api = process.env.NEXT_PUBLIC_URL_API as string;

export async function getAllFeed(
  page: string | undefined,
  limit: number,
  offset: number,
  user: string | undefined,
  token: string
): Promise<IPost[]> {
  const response = await fetch(
    api + `posts?limit=${limit}&offset=${offset}&page=${page}&user=${user}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );
  if (!response.ok) throw Error("Falha ao receber o post");
  const json = await response.json();
  return json;
}
export async function postData(post: FormData, token: string): Promise<any> {
  const response = await fetch(api + "submit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: post,
  });
  if (!response.ok) throw Error("Falha ao receber o post");
  const json = await response.json();
  return json;
}
export async function sendLike(
  postId: number,
  typeOfLike: string,
  token: string
) {
  const response = await fetch(api + "likes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ postId, typeOfLike }),
  });
  if (!response.ok) throw Error("Falha ao dar like");
  const json = await response.json();
  return json;
}
export async function getLike(token: string) {
  const response = await fetch(api + "likes", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw Error("Falha ao dar like");
  const json = await response.json();
  return json;
}
export async function getComment(postId: string, token: string) {
  const response = await fetch(api + `comment?postId=${postId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw Error("Falha ao receber os comentários");
  const json = await response.json();
  return json;
}
export async function postComment(
  userId: number,
  postId: string,
  comment: string,
  token: string
) {
  const data = JSON.stringify({ userId, postId, comment });
  const response = await fetch(api + "comment", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  if (!response.ok) throw Error("Falha ao enviar o comentário!");

  const json = await response.json();
  return json;
}
export async function postList(
  limit: number,
  offset: number,
  token: string
): Promise<IPostTable[]> {
  const response = await fetch(
    api + `postList?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) throw Error("Falha ao obter a listagem de posts!");

  const json = await response.json();
  return json;
}
export async function userList({
  limit,
  offset,
  token,
}: {
  limit: number;
  offset: number;
  token: string;
}): Promise<IUser[]> {
  const response = await fetch(
    api + `userList?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) throw Error("Falha ao obter os dados de mod!");

  const json = await response.json();
  return json;
}
export async function postApprove(
  postId: number,
  status: string,
  token: string
) {
  const response = await fetch(api + "postList", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ postId, status }),
  });
  if (!response.ok) throw Error("Falha ao aprovar o post!");

  const json = await response.json();
  return json;
}
export async function searchUser(
  userName: string,
  type: string,
  token: string
): Promise<IUserApi> {
  const response = await fetch(api + "search", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify({ userName, type }),
  });
  if (!response.ok) throw Error("falha ao buscar o usuário!");

  const json = await response.json();
  return json;
}
export async function modAction(
  userId: number,
  action: string,
  token: string
): Promise<any> {
  const response = await fetch(api + "userList", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, action }),
  });
  if (!response.ok) throw Error("falha ao buscar o usuário!");

  const json = await response.json();
  return json;
}
export async function login(token: any): Promise<ILogin> {
  const response = await fetch(api + "auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  });
  if (!response.ok) throw Error("falha ao fazer o login!");

  const json = await response.json();
  return json;
}
export async function EditDesc(
  desc: string,
  token: string
): Promise<IResponse> {
  const response = await fetch(api + "update", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ desc }),
  });
  if (!response.ok) throw Error("falha ao atualizar a descrição!");

  const json = await response.json();
  return json;
}
