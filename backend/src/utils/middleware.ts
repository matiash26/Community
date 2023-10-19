import * as express from "express";
const app = express();

const middleware = app.use(async function (req, res, next) {
  if (req.path == "/api/auth") return next();
  const token = req.headers?.authorization?.split("Bearer ")[1] as string;
  const response = await fetch("https://id.twitch.tv/oauth2/validate", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  if (json.status === 401) {
    res.send({ error: true, message: "token inválido, relogue a conta!" });
    return;
  }
  res.locals.userName = json.login;
  next();
});

export default middleware;
