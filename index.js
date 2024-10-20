require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const MondoDb = require("./config/MongoDb-Connection");
const { UserMessageSchemas } = require("./schema/usermessagemodel");
const NotificationModel = require("./schema/notificationmodel");

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// MongoDB connection
const Mongo = new MondoDb();
Mongo.connect(); // Ensure MongoDB is connected properly

// Middleware
const AdminMiddleware = require("./middlewares/AdminUser");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Multer Setup for File Uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed!"));
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit to 5MB
  fileFilter: fileFilter,
});

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Socket.IO for real-time communication
io.on("connection", function (socket) {
  console.log("CONNECTED");

  socket.on("SignalUploaded", async function () {
    const result = new NotificationModel({ message: "New Signal Uploaded!" });
    await result.save();

    const userNotifications = await NotificationModel.find({}).sort({ createdAt: -1 });
    io.emit("NewSignal Uploaded", { message: "New Signal Uploaded!", notifications: userNotifications });
  });

  socket.on('sendMessage', async function(newMessage, token) 
  {
    const result = new NotificationModel({ message: "New-Message" });
    await result.save();


    try {
      const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded.username)
      const messageData = {
        message: newMessage,
        role: decoded.role || 'User',
        id: decoded.id,
        name:decoded.username,
        pic: decoded.image
      };

      const result = new UserMessageSchemas(messageData);
      await result.save();
      console.log(newMessage);
      // Broadcast new message to all clients except sender
      socket.broadcast.emit('receiveMessage', newMessage,decoded.username,decoded.image);
    } catch (error) {
      console.error("Error handling sendMessage event:", error);
    }
  });
});

// Routes for APIs
const Login = require("./Routes/Login");
const NavLogin = require("./Routes/NavLogin");
const AddUser = require("./Routes/NewUser");
const Cv = require("./Routes/CvDownload");
const TradeSignal = require("./Routes/TradeSignal");
const FrontEndSignal = require("./Routes/FrontEndSignal");
const UserNavNotfications = require("./Routes/usernotifications");
const CreateUserOtp = require("./Routes/usersignup");
const UserMessage = require("./Routes/userMessage");
const AllUser = require("./Routes/AllUser");
const EthBalanceCheck = require("../node-js/Routes/Web3/Balance");
const NewDeal = require("./Routes/Web3/NewDeal");
const ID = require("./Routes/Web3/CheckId");
const Status = require("./Routes/Web3/StatusCheck");
const LockAmount = require("./Routes/Web3/LockAmount");
const User1Agree = require("./Routes/Web3/User1Agree");

// Apply routes
app.use("/Login", Login);
app.use("/NavLogin", NavLogin);
app.use("/NewUser", AddUser);
app.use("/Cv", Cv);
app.use("/UserMessage", UserMessage);
app.use("/AllUser", AllUser);
app.use("/Notifications", UserNavNotfications);
app.use("/UserOtpCreate", CreateUserOtp);
app.use("/TradeSignal", TradeSignal);
app.use("/FrontEndSignal", FrontEndSignal);
app.use("/EthBalanceCheck", EthBalanceCheck);
app.use("/NewDeal", NewDeal);
app.use("/DEALS", ID);
app.use("/Status", Status);
app.use("/LockAmount", LockAmount);
app.use("/User1Agree", User1Agree);

// Admin-specific middleware (for routes requiring admin access)
app.use(["/NewUser"], AdminMiddleware);

// Global Error Handling
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const port = process.env.PORT || 3002;
server.listen(port, () => {
  console.log(`Your App is running on port ${port}`);
});
