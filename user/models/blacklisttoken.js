const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d' // Automatically remove tokens after 7 days
    }
}, { timestamps: true });

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);