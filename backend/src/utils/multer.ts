import multer from 'multer';
import TypeOfMedia from './typeOfMedia';

const multerStorage = function () {
  let fileName: string;
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/../public');
    },
    filename: function (req, file, cb) {
      const type = TypeOfMedia(file.originalname);
      if (type) {
        const name = `${Date.now() + btoa(file.originalname)}`.slice(0, 50);
        const newFileName = `${name}.${type}`;

        cb(null, newFileName);
        fileName = newFileName;
      }
    },
  });
  function getFileName() {
    return fileName;
  }
  function clearFilename() {
    fileName = '';
  }
  return { getFileName, storage, clearFilename };
};
export default multerStorage;
