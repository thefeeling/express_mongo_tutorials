/**
 * Created by dev on 2017. 2. 2..
 */
const Todo = require('./model');
const dbUtil = require('./databaseUtil');
const _ = require('lodash');
const co = require('co');



function pageHelper(query) {
    const pageInfo = {};
    pageInfo.skip = _.isNumber(query.skip) ? query.skip : 0;
    pageInfo.limit = _.isNumber(query.limit) ? query.limit : 10;

    _.omit(query, ['skip', 'limit']);
    return pageInfo;
}



module.exports = {
    list: function (query) {
        const page = pageHelper(query);
        // 1) Promise
        // return Todo.find(query, function (err, items) {
        //     return err ? [] : items;
        // });

        // 1-1)
        // return Todo.find(query)
        //     .skip(page.skip)
        //     .limit(page.limit)
        //     .exec(function (err, items) {
        //        return err ? [] : items;
        //     });

        // 2) Generator
        return co(function* g() {
            const todoList =  Todo.find(query).skip(page.skip).limit(page.limit).exec();
            const totalCount = Todo.count(query, (err, count) => count);
            return yield {
                items: todoList,
                skip: page.skip,
                limit: page.limit,
                totalCount: totalCount
            }
        });
    },
    get: function (todoId) {
        return Todo.findById(todoId);
    },
    create: function (body) {
        return Todo.create(body);
    },
    update: function (todoId, body) {
        if(body.status === 'DONE'){
            body.doneAt = new Date();
        }
        return Todo.update({ _id: todoId}, { $set: body });
    },
    remove: function (todoId) {
        return Todo.remove({ _id : todoId});
    }
};