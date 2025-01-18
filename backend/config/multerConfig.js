const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const storage = new GridFsStorage({
    url: process.env.Database_URL,
    file: (req, file) =>
        new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename =
                    buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename,
                    bucketName: "uploads",
                };
                resolve(fileInfo);
            });
        }),
});

const upload = multer({ storage });
module.exports = upload;
