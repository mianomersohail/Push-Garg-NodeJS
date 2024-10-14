const express = require('express');
const router = express.Router();
const AddUserController = require('../User-Controller/AddUserController');
const AddUserControllers = new AddUserController();
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
router.get('/', upload.single('image'), (req, res) => AddUserControllers.AddSignal(req, res));
router.post('/', upload.single('image'), (req, res) => AddUserControllers.AddUser(req, res));
router.delete('/',(req,res)=>AddUserControllers.RemoveUser(req,res))
router.put('/',(req,res)=>AddUserControllers.UpdateUser(req,res))
module.exports=router
