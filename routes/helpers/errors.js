let notFound = function(req, res, next){
    res.status(404).json({ status: 404, title: 'Not Found' });
}

let internalServerError = function(req, res, next){
    res.status(500).json({ status: 500, title: 'Internal Server Error' });
}

let badRequest = function(req, res, next){
    res.status(400).json({ status: 400, title: 'Bad Request' });
}

module.exports = { notFound, internalServerError, badRequest };
