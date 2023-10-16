import communityController from "./Controller/CommunityController.js";
import * as express from "express";

const app = express();

app.use(communityController);

app.listen(1234, () => {
  console.log("Server is running!");
});
