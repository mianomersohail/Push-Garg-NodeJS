const express = require('express');
const router = express.Router();
const AddUserController = require('../User-Controller/AddUserController');
const AddUserControllers = new AddUserController();
const multer = require('multer'); // Add multer here
const path=require('path')

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to store the uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Set a unique filename
    }
});

const upload = multer({ storage: storage });
router.post('/', upload.single('image'), (req, res) => AddUserControllers.AddUser(req, res));

router.delete('/',(req,res)=>AddUserControllers.RemoveUser(req,res))
router.put('/',(req,res)=>AddUserControllers.UpdateUser(req,res))
module.exports=router
