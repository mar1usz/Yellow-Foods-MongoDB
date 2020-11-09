let badRequest = {
    status: 400,
    title: 'Bad Request'
};

let notFound = {
    status: 404,
    title: 'Not Found'
};

let internal = {
    status: 500,
    title: 'Internal Server Error'
};

module.exports = { badRequest, notFound, internal };
