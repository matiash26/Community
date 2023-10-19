import * as multer from 'multer';
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
        const newFileName = `${Date.now() + btoa(file.originalname)}.${type}`;
        cb(null, newFileName);
        fileName = newFileName;
      }
    },
  });
  function getFileName() {
    return fileName;
  }
  function clearFilename() {
    fileName = null;
  }
  return { getFileName, storage, clearFilename };
};
export default multerStorage;
