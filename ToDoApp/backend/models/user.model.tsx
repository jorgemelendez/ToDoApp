import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3
    },
    password: {
        type: String,
        required: true,
        min: 4
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;