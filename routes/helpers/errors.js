const badRequest = {
    status: 400,
    title: 'Bad Request'
};

const notFound = {
    status: 404,
    title: 'Not Found'
};

const internal = {
    status: 500,
    title: 'Internal Server Error'
};

module.exports = { badRequest, notFound, internal };
