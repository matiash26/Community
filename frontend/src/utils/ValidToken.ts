export default async function ValidToken(token: string) {
  const response = await fetch('https://id.twitch.tv/oauth2/validate', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  return json?.login ? true : false;
}
