require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const MondoDb = require('./config/MongoDb-Connection');

const app = express();
const port = process.env.PORT || 3002;
const multer  = require('multer');

app.use('/uploads', express.static('uploads'));

// Setup multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where images will be stored
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        // Ensure unique file name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Save the file with its original extension
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filter only image file types
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'));
    }
};

// Set multer upload configurations
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit to 5MB
    },
    fileFilter: fileFilter
});
// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
const AdminMiddleware=require('./middlewares/AdminUser')
app.use(cors({
    origin: ['http://localhost:3000'], 
    credentials: true, 
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// MongoDB connection
const Mongo = new MondoDb();
Mongo.connect(); // Ensure this is properly implemented to connect to your database
// Routes

//All MIDDLEWARES FOR USER
app.use(['/NewUser'],AdminMiddleware)
const Login = require('./Routes/Login');
const NavLogin = require('./Routes/NavLogin');
const AddUser = require('./Routes/NewUser');
const Cv = require('./Routes/CvDownload');
const TradeSignal=require('./Routes/TradeSignal')
const FrontEndSignal=require('./Routes/FrontEndSignal')
app.use('/Login', Login);
app.use('/NavLogin', NavLogin);
app.use('/NewUser', AddUser);
app.use('/Cv', Cv);
app.use('/TradeSignal',TradeSignal)
app.use("/FrontEndSignal",FrontEndSignal)
// app.use('/RemoveUser', RemoveUser);
// Ethereum-related routes
const EthBalanceCheck = require('../node-js/Routes/Web3/Balance');
const NewDeal = require('./Routes/Web3/NewDeal');
const ID = require('./Routes/Web3/CheckId');
const Status = require('./Routes/Web3/StatusCheck');
const LockAmount = require('./Routes/Web3/LockAmount');
const User1Agree = require('./Routes/Web3/User1Agree');
app.use('/EthBalanceCheck', EthBalanceCheck);
app.use('/NewDeal', NewDeal);
app.use('/DEALS', ID);
app.use('/Status', Status);
app.use('/LockAmount', LockAmount);
app.use('/User1Agree', User1Agree);
// Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Start server
app.listen(port, () => {
    console.log(`Your App is running on port ${port}`);
});
