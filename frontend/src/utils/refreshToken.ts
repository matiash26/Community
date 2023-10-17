export default async function refreshToken(refresh_token: string) {
  const client_id = process.env.NEXTAUTH_CLIENT_ID;
  const client_secret = process.env.NEXTAUTH_SECRET;
  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${client_id}&client_secret=${client_secret}`,
  });
  const json = await response.json();
  return json;
}
