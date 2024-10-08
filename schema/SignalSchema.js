const mongoose = require('mongoose');

const SignalSchema = new mongoose.Schema({
    image: { type: String },
    mainHeading: { type: String, required: true },
    mainDescription: { type: String, required: true }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

// Create a TTL index to expire documents after 1 day (86400 seconds)
SignalSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const SignalModel = mongoose.model('Signal', SignalSchema);

module.exports = {
    SignalModel
};
