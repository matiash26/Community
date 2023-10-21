import communityController from './Controller/CommunityController';
import multerMiddleware from './utils/multerMiddleware';
import express from 'express';

const app = express();
app.use(communityController);
app.use(multerMiddleware);

app.listen(1233, () => {
  console.log('Server is running!');
});
