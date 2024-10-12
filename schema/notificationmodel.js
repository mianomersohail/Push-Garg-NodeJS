// models/Notification.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LoginSchemas' }], // Users who read the notification
});
const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
