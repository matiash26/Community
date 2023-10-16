export interface IValid {
  client_id: string;
  expires_in: number;
  login: string;
  user_id: string;
}
export default async function ValidToken(
  token: string
): Promise<IValid | boolean> {
  try {
    const response = await fetch("https://id.twitch.tv/oauth2/validate", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    if (!json.login) {
      return false;
    }
    return json;
  } catch (error) {
    return false;
  }
}
