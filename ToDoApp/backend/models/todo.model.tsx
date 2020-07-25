import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: {type: String, required: false},
    description: {type: String, required: false},
    dateCreated: {type: Date, required: true},
    dateDue: {type: Date, required: false}
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
