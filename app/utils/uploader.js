const path = require("path");
const fs = require("fs");
const { diskStorage } = require("multer");
const multer = require("multer");
const createHttpError = require("http-errors");

function createRoute(req) {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDay().toString();
    const directory = path.join(__dirname , ".." , ".." , "public" , "uploads" , year , month , day);
    req.body.fileUploadPath = path.join("uploads" , year , month , day);
    fs.mkdirSync(directory , {recursive: true});
    return directory
};

const storage = multer.diskStorage({
    destination: (req , file , cb) => {
        if(file?.originalname) {
            const filePath = createRoute(req);
            return cb(null , filePath);
        }
        else {
            return cb(null , null)
        }
    },
    filename: (req , file , cb) => {
        if(file?.originalname) {
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext);
            req.body.filename = fileName;
            return cb(null , fileName);
        }
        else {
            return cb(null , null);
        }
    }
})

function FileFilter(req , file , cb) {
    const ext = path.extname(file.originalname);
    const mimetypes = [".jpg" , ".jpeg", ".png"];
    if(mimetypes.includes(ext)) {
        return cb(null , true);
    }
    else {
        return cb(createHttpError.BadRequest("فرمت انتخاب شده صحیح نمی باشد") , false);
    }
}

const pictureMaxSize = 100 * 1000;
const uploadFile = multer({storage , FileFilter , limits: {fileSize: pictureMaxSize}});

module.exports = {
    uploadFile
}