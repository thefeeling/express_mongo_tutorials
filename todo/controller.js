/**
 * Created by dev on 2017. 2. 2..
 */
const service = require('./service');


/**
 * HTTP 200 - JSON
 * @param res
 * @param json
 */
function successWithJsonContent(res) {
    return (json) => {
        res.status(200).json(json);
    }
}


/**
 * HTTP 200 - TEXT
 * @param res
 */
function successWithoutContent(res) {
    return () => {
        res.status(204).send();
    }
}

/**
 * HTTP 400 - JSON
 * @param res
 * @returns {function(*)}
 */
function errorWithJson(res) {
    return (error) => {
        res.status(4004).json({
            error: {
                name: error.name,
                message: error.message
            }
        });
    };
}


module.exports = {
    list:function (req, res) {
        service.list(req.query)
            .then(successWithJsonContent(res))
            .catch(errorWithJson(res));
    },
    get: function (req, res) {
        return service.get(req.params.id)
            .then(successWithJsonContent(res))
            .catch(errorWithJson(res));
    },
    create: function (req, res) {
        return service.create(req.body)
            .then(successWithoutContent(res))
            .catch(errorWithJson(res));
    },
    update: function (req, res) {
        return service.update(req.params.id, req.body)
            .then(successWithoutContent(res))
            .catch(errorWithJson(res));
    },
    remove: function (req, res) {
        return service.remove(req.params.id)
            .then(successWithoutContent(res))
            .catch(errorWithJson(res));
    }
};