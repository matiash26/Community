import multer from 'multer';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
const multerMiddleware = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.send({
        error: true,
        message: 'O arquivo é muito grande. Limite de 15 MB.',
      });
    } else {
      res.send({
        error: true,
        message: 'Ocorreu um erro ao fazer o upload do arquivo.',
      });
    }
  } else {
    next(err);
  }
};

export default multerMiddleware;
