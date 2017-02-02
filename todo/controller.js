/**
 * Created by dev on 2017. 2. 2..
 */
const service = require('./service');

module.exports = {
    list:function (req, res) {
        return service.list(req.query)
            .then(function (todoList) {
               res.json(todoList);
            });
    },
    get: function (req, res) {
        const id = req.params.id;
        return service.get(id)
            .then(function (todo) {
               res.json(todo);
            });
    },
    create: function (req, res) {
        return service.create(req.body)
            .then(function () {
                res.status(204).end('No Contents');
            });
    },
    update: function (req, res) {
        return service.update(req.params.id, req.body)
            .then(function (param) {
                res.status(204).end('No Contents');
            });
    },
    remove: function (req, res) {
        return service.remove(req.params.id)
            .then(function () {
                res.status(204).end('No Contents');
            });
    }
};