const AddUserController=require('../User-Controller/Tradesignal')
const AddUserControllers=new AddUserController()
const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path=require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });
router.post('/', upload.single('image'), (req, res) => AddUserControllers.AddSignal(req, res));
module.exports=router;
