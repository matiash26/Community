import * as multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/community/www');
  },
  filename: function (req, file, cb) {
    cb(null, '123' + file.originalname);
  },
});
export default storage;
