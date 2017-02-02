/**
 * Created by dev on 2017. 2. 2..
 */
const Todo = require('./model');
const dbUtil = require('./databaseUtil');
const _ = require('lodash');
const co = require('co');

function pageHelper(query) {
    query.skip =  _.isNumber(query.skip) ? query.skip : 0;
    query.limit = _.isNumber(query.limit) ? query.limit : 10;
}



module.exports = {
    list: function (query) {
        pageHelper(query);
        return co(function* g() {
            console.log('Start Co Wrap');
            // const todoList = yield Todo.find(query, (err, items) => items).then(items => items);
            // const todoList = yield Todo.find(query).skip(query.skip).limit(query.limit).exec();
            const todoList = yield Todo.find(query).exec((err, items) => items);
            const totalCount = yield Todo.count(query, (err, count) => count).then(count => count);
            return yield {
                items: todoList,
                skip: query.skip,
                limit: query.limit,
                totalCount: totalCount
            }
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