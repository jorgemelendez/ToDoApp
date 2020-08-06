const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: {type: String, required: false},
    description: {type: String, required: false},
    dateDue: {type: Date, required: false}
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
