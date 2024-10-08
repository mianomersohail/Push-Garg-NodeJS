const mongoose = require('mongoose');

const SignalSchema = new mongoose.Schema({
    image: { type: String },
    mainHeading: { type: String, required: true },  // Corrected `typing` to `type`
    mainDescription: { type: String, required: true }  // Corrected `maindiscription` to `mainDescription`
}, { timestamps: true });

const SignalModel = mongoose.model('Signal', SignalSchema);  // Updated model name to be more conventional

module.exports = {
    SignalModel  
};
