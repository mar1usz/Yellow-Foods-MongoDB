// https://tools.ietf.org/html/rfc7807

const badRequest = {
    type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
    title: 'Bad Request',
    status: 400
};

const validationProblem = {
    type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
    title: 'One or more validation errors occurred.',
    status: 400
};

const notFound = {
    type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
    title: 'Not Found',
    status: 404
};

const internal = {
    type: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
    title: 'An error occured while processing your request.',
    status: 500
};

module.exports = { badRequest, validationProblem, notFound, internal };
