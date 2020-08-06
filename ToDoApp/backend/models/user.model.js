const mongoose =  require('mongoose');
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
    // TODO: Add the name + email in the schema and add it in the endpoints
    //name: {}
    //email: {}
}, {
    timestamps: true
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;