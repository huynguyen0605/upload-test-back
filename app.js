var express = require('express');
var multer = require('multer');
var cors = require('cors');
var fs = require('fs');

const app = express();

app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    },
});

var uploads = multer({ storage: storage }).single('file');

app.post('/upload', function (req, res) {
    uploads(req, res, function (err) {
        if (err) res.status(500).send(err);
        res.status(200).send(req.file);
    });
});

app.get('/download/:fileName', function (req, res) {
    const { fileName } = req.params;
    console.log('huynvq::=========>fileName', fileName, `${__dirname}`);
    const file = `${__dirname}/uploads/${fileName}`;
    res.download(file);
});

app.get('/fileLists', function (req, res) {
    const uploadDir = `${__dirname}/uploads/`;
    var files = fs.readdirSync(uploadDir);
    res.send(files);
});
app.listen(8000, function () {
    console.log('Running on port 8000!');
});

