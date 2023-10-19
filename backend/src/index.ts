import communityController from './Controller/CommunityController.js';
import multerMiddleware from './utils/multerMiddleware.js';
import * as express from 'express';

const app = express();
app.use(communityController);
app.use(multerMiddleware);

app.listen(1234, () => {
  console.log('Server is running!');
});
