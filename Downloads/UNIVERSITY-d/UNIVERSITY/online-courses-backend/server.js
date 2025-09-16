const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// uploads فولدىرىنى يارات
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer تەڭشەش
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// بىر فايىل يۈكلەش API
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('فايىل يۈكلەنمىدى');
  res.json({ message: 'فايىل مۇۋەپپەقىيەتلىك يۈكلەندى', file: req.file });
});

// كۆپ فايىل يۈكلەش API
app.post('/upload-multiple', upload.array('files', 10), (req, res) => {
  if (!req.files) return res.status(400).send('فايىللار يۈكلەنمىدى');
  res.json({ message: 'فايىللار مۇۋەپپەقىيەتلىك يۈكلەندى', files: req.files });
});

// فايىللارغا توردا كۆرۈنىش رۇخسەت
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(5000, () => {
  console.log('Server 5000 portتا ئىشلەۋاتىدۇ...');
});
