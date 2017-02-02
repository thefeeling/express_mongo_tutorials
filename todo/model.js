/**
 * Created by dev on 2017. 2. 2..
 */
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const todoSchema = new Schema({
    title: { type: String },
    status: { type: String },
    context: { type: String },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    doneAt: { type: Date }
});


module.exports = Mongoose.model('todo', todoSchema);