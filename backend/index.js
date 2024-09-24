const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./connect');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const path = require('path');

const User = require('./models/userModel');
const File = require('./models/fileModel');

// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'backend/uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({ storage,
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpeg|jpg|png|gif/; // Allow only these file types
//         const mimetype = filetypes.test(file.mimetype);
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb('Error: File type not supported');
//     },
//  });

app.use(express.json());

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
));

app.use(cookieParser());
// app.use('/uploads', express.static('backend/uploads'));    // serve the uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


connectToDB()
    .then(() => console.log('Connect to database'))
    .catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api', authRoutes);

// app.post('/upload', upload.single('file'), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     const newFile = new File({
//         filename: req.file.originalname,
//         userId: req.user.id
//     });

//     await User.findByIdAndUpdate(req.user.id, {$push: {files: newFile._id}});
//     res.send(`Uploaded file: ${req.file.originalname}`);
// })

// app.get('/files', async (req, res) => {
//     const userId = req.user.id;
//     const files = await File.find({userId});
//     res.json(files);
// });

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});