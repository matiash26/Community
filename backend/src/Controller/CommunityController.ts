import { IPost, IComment, IUser, ISql, ILikes } from '../Models/type';
import { Response, Request } from 'express';
import multerStorage from '../utils/multer';
import middleware from '../utils/middleware';
import Community from '../Models/CommunityModels';
import howLong from '../utils/howLong';
import getDate from '../utils/date';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
const community = new Community();

const app = express();
app.use(cors());
app.use(middleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/upload', express.static(__dirname + '/../public'));
const { storage, getFileName, clearFilename } = multerStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 },
});

app.post(
  '/api/submit',
  upload.single('file'),
  async (req: Request, res: Response) => {
    const { text, page, videoId } = req.body;
    const checkPage = page === 'Feed' || page === 'React';
    const textLenght = text.trim().split('').length;
    const userName = res.locals.userName;
    let fileName = getFileName();
    const date = getDate();
    if (fileName || (textLenght && textLenght <= 500 && checkPage)) {
      const name = fileName || videoId;
      const [user] = (await community.getUserByEmailOrUser(
        userName,
      )) as IUser[];
      const approved = user.role === '1' || user.role === '2' ? '2' : '1';
      const response = (await community.sendPost(
        user.id,
        text,
        name,
        approved,
        date,
        page,
      )) as ISql[];
      if (response[0].affectedRows === 1) {
        res.send({ error: false, message: 'post enviado com sucesso!' });
        clearFilename();
        return;
      }
      res.send({
        error: true,
        message: 'falha no servidor, entre em contato 😁👍',
      });
    }
    res.send({
      error: true,
      message: 'Falha ao fazer a postagem!',
    });
  },
);
app.get('/api/posts', async (req: Request, res: express.Response) => {
  const limit = req.query.limit as string;
  const offset = req.query.offset as string;
  const page = req.query.page as string;
  const user = req.query.user as string;
  const numberValid =
    Number.isInteger(parseInt(limit)) && Number.isInteger(parseInt(offset));
  const pageValid = ['feed', 'react'].includes(page);
  if ((numberValid && pageValid) || (numberValid && user !== 'undefined')) {
    const allFeed = (await community.getAllFeed(
      page,
      limit,
      offset,
      user,
    )) as IPost[];
    const dateConverted = allFeed.map((feed) => ({
      ...feed,
      date: howLong(feed.date),
    }));
    res.send({ error: false, data: dateConverted });
    return;
  }
  res.send({
    error: true,
    message: 'Falha ao buscar as postagens!',
  });
});
app.post('/api/likes', async (req: Request, res: express.Response) => {
  const { postId, typeOfLike } = req.body;
  const userName = res.locals.userName;
  const likesAllowed = ['0', '1', '2', '3'].includes(typeOfLike);
  if (likesAllowed) {
    const [user] = (await community.getUserByEmailOrUser(userName)) as IUser[];
    const thisUserHasLiked = (await community.getUserLiked(
      user.id,
      postId,
    )) as IUser[];
    const thereIsLike = thisUserHasLiked.length > 0;
    if (thereIsLike) {
      await community.updateLike(postId, typeOfLike, user.id);
      const [row] = (await community.getLikedByPost(postId)) as ILikes[];
      res.send({
        error: false,
        message: 'liked com sucesso!',
        update: row,
      });
      return;
    }
    const response = (await community.likedPost(
      user.id,
      postId,
      typeOfLike,
    )) as ISql;

    const [row] = (await community.getLikedByPost(postId)) as ILikes[];
    if (response.affectedRows === 1) {
      res.send({
        error: false,
        message: 'liked com sucesso!',
        update: row,
      });
      return;
    }
    res.send({
      error: true,
      message: 'falha ao dar like!',
    });
  }
  res.send({
    error: true,
    message: 'precisa estar logado para dar likes ou tipo inválido!',
  });
});
app.get('/api/comment', async (req: Request, res: express.Response) => {
  const postId = req.query.postId as string;
  const checkPostId = Number.isInteger(parseInt(postId));
  if (checkPostId) {
    const getComment = (await community.getComments(postId)) as IComment[];
    const [getuserPost] = (await community.getPostById(postId)) as IPost[];
    const dataPostConvert = {
      ...getuserPost,
      date: howLong(getuserPost?.date),
    };
    const dateCommentConvert = getComment.map((comment: IComment) => ({
      ...comment,
      date: howLong(comment.date),
    }));
    if (getComment) {
      res.send({
        error: false,
        comment: dateCommentConvert,
        post: dataPostConvert,
      });
      return;
    }
    res.send({
      error: true,
      message: 'comentário não encontrado!',
    });
    return;
  }
  res.send({
    error: true,
    message: 'insira o postId para receber os comentários!',
  });
});
app.post('/api/comment', async (req: Request, res: express.Response) => {
  const { postId, comment } = req.body;
  const userName = res.locals.userName;
  const [user] = (await community.getUserByEmailOrUser(userName)) as IUser[];

  if (postId && comment) {
    const date = getDate();
    await community.postComment(user.id, postId, comment, date);
    const getComment = (await community.getComments(postId)) as IComment[];
    const dateConverted = getComment.map((comment: IComment) => ({
      ...comment,
      date: howLong(comment.date),
    }));
    if (getComment) {
      res.send({
        error: false,
        comment: dateConverted,
      });
      return;
    }
    res.send({
      error: true,
      message: 'comentário não encontrado!',
    });
    return;
  }
  res.send({
    error: true,
    message: 'falta de dados para enviar o comentário!',
  });
});
app.get('/api/postList', async (req: Request, res: express.Response) => {
  const limit = req.query.limit as string;
  const offset = req.query.offset as string;
  const numberValid =
    Number.isInteger(parseInt(limit)) && Number.isInteger(parseInt(offset));
  if (numberValid) {
    const data = await community.postListData(+limit, +offset);
    res.send(data);
    return;
  }
  res.send({
    error: true,
    message: 'insira um limit e offset para obter os dados!',
  });
});
app.post('/api/postList', async (req: Request, res: express.Response) => {
  const { status, postId } = req.body;
  const userName = res.locals.userName;
  const checkPostId = Number.isInteger(parseInt(postId));
  const statusCheck = ['0', '2'].includes(status);
  const [user] = (await community.getUserByEmailOrUser(userName)) as IUser[];
  if (user.role !== '2') {
    res.send({ error: true, msg: 'sem cargo para aprovar o post!' });
  }
  if (checkPostId && statusCheck) {
    const response = (await community.approvedPost(postId, status)) as ISql[];
    response[0].affectedRows === 1
      ? res.send({ error: false, msg: 'aprovado com sucesso!' })
      : res.send({ error: true, msg: 'falha ao aprovar!' });
    return;
  }
  res.send({
    error: true,
    msg: 'falta de parâmetros para aprovação do Post!',
  });
});
app.post('/api/search', async (req: Request, res: express.Response) => {
  const { userName, type } = req.body;
  const checkUser = userName?.split('').length;
  if (checkUser && type) {
    const search = await community.searchUser(userName, type);
    res.send({ error: false, search });
    return;
  }
  res.send({
    error: true,
    msg: 'falta de parâmetros para buscar o usuário!',
  });
});
app.get('/api/userList', async (req: Request, res: express.Response) => {
  const limit = req.query.limit as string;
  const offset = req.query.offset as string;
  const userName = String(res.locals.userName).toLowerCase();
  const numberValid =
    Number.isInteger(parseInt(limit)) && Number.isInteger(parseInt(offset));
  if (numberValid) {
    const data = (await community.userList(+limit, +offset)) as IUser[];
    const withOutUser = data.filter(
      (each: IUser) => each.username.toLowerCase() !== userName,
    );
    res.send(withOutUser);
    return;
  }
  res.send({
    error: true,
    message: 'insira um limit e offset para obter os dados!',
  });
});
app.post('/api/userList', async (req: Request, res: express.Response) => {
  const { action, userId } = req.body;
  const numberValid = Number.isInteger(parseInt(userId));
  const checkAction = ['0', '1', '2'].includes(action);
  const userName = res.locals.userName;
  if (!checkAction && !numberValid) {
    res.send({
      error: true,
      message: 'falta de parâmetro para realizar a ação!',
    });
  }

  const [user] = (await community.getUserByEmailOrUser(userName)) as IUser[];
  const role = user.role === '2';
  if (!role) {
    res.send({
      error: true,
      message: 'Você não tem permissão para realizar essa ação!',
    });
    return;
  }
  await community.updateUserList(userId, action);
  res.send({
    error: false,
    message: 'ação feita com sucesso!',
  });
  return;
});
app.post('/api/auth', async (req: Request, res: express.Response) => {
  const { name, email, picture } = req.body;
  const date = getDate();
  const [data] = (await community.getUserByEmailOrUser(email)) as IUser[];
  if (!data) {
    community.createUser(picture, name, email, date);
  }
  res.send({
    error: false,
    data,
  });
});
app.post('/api/update', async (req: Request, res: express.Response) => {
  const { desc } = req.body;
  const userName = res.locals.userName;
  if (desc) {
    await community.updateDesc(desc, userName);
    res.send({
      error: false,
      message: 'atualizado com sucesso!',
    });
    return;
  }
  res.send({
    error: true,
    message: 'falha ao atualizar a desc',
  });
});

export default app;
