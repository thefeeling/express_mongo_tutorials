"use strict"

/**
 * Created by dev on 2017. 2. 2..
 */


const Todo = require('./model');
const dbUtil = require('./databaseUtil');
const _ = require('lodash');
const co = require('co');
const selected = 'title status context dueDate doneAt createdAt';




/**
 * 페이징(Skip, Limit).
 * @param query
 * @returns {{}}
 */
function paging(query) {
    const pageInfo = {};
    pageInfo.skip = _.isNumber(query.skip) ? query.skip : 0;
    pageInfo.limit = _.isNumber(query.limit) ? query.limit : 10;
    _.omit(query, ['skip', 'limit']);
    return pageInfo;
}


/**
 * 단일 쿼리스트링 리퀘스트 유무.
 * @param query
 * @returns {number}
 */
function isQuerySingle(query) {
    const length = Object.keys(query).length;
    return length === 1 ? 1 : 0;
}


/**
 * 단일 쿼리스트링의 경우, 정규식으로 Like 검색
 * @param query
 * @returns {*}
 */
function textQuery(key, value) {
    const search = {};
    search[key] = {
        $regex: new RegExp(value, 'i')
    };
    return search;
}


/**
 * 단일 쿼리스트링의 경우, 정규식으로 Like 검색
 * @param query
 */
function dueDateQuery(key, value) {
    const search = {};
    const dueDate = new Date(value);
    search.createdAt = { $lt : dueDate };
    search.doneAt = { $gt: dueDate };
    return search;
}


function getTodoQuery(query) {
    if(!isQuerySingle(query)) {
        return query;
    }

    let queryFn;
    const key = Object.keys(query)[0];
    const value = query[key];

    if(key === 'title' || key === 'status' || key === 'context') {
        queryFn = textQuery
    }
    else if(key === 'dueDate'){
        queryFn = dueDateQuery
    }

    return queryFn(key, value);
}


module.exports = {
    list: function (query) {
        const page = paging(query);
        query = getTodoQuery(query);
        return co(function* g() {
            const todoList =  Todo.find(query)
                .skip(page.skip)
                .limit(page.limit)
                .select(selected)
                .exec();

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