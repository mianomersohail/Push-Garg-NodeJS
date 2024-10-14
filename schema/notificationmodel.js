// models/Notification.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LoginSchemas' }], 
},{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
