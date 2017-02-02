/**
 * Created by dev on 2017. 2. 2..
 */
const Todo = require('./model');
const dbUtil = require('./databaseUtil');

module.exports = {
    list: function (query) {
        return Todo.find({}, function (err, todoList) {
            console.log(todoList);
            return todoList;
        });
    },
    get: function (todoId) {
        return Todo.findOne({ "_id" : dbUtil.ObjectId(todoId)}, function (err, todo) {
           return todo;
        });
    },
    create: function (body) {
        const newTodo = new Todo(body);
        return newTodo.save(function (err) {
            if(err) console.error(err);
            return newTodo;
        });
    },
    update: function (todoId, body) {
        if(body.status === 'DONE'){
            body.doneAt = new Date();
        }
        // Model.update의 경우, Promise 리턴 없음
        return new Promise(function (resolve, reject) {
            Todo.update({ "_id" : dbUtil.ObjectId(todoId)}, body, {}, function (err, rawResponse) {
                if(err) reject(err);
                resolve(rawResponse);
            });
        });
    },
    remove: function (todoId) {
        return Todo.remove({ "_id" : dbUtil.ObjectId(todoId)}, function (err) {
           if(err) reject(err);
           return undefined;
        });
    }
};