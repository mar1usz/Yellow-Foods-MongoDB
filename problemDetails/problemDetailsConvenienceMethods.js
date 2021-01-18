// https://tools.ietf.org/html/rfc7807

const { problemDetailsFactory } = require("./problemDetailsFactory");

exports.problem = ({
    detail = null,
    instance = null,
    status = null,
    title = null,
    type = null,
    extensions = null } = {}) =>
    problemDetailsFactory
        .createProblemDetails({
            detail: detail,
            instance: instance,
            status: status,
            title: title,
            type: type,
            extensions: extensions
        });

exports.validationProblem = (errors = null) =>
    problemDetailsFactory
        .createProblemDetails({
            status: 400,
            title: 'One or more validation errors occurred.',
            type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
            extensions: errors
        });

exports.notFound = () =>
    problemDetailsFactory
        .createProblemDetails({
            status: 404,
            title: 'Not Found',
            type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4'
        });

exports.forbid = () =>
    problemDetailsFactory
        .createProblemDetails({
            status: 403,
            title: 'Forbidden',
            type: 'https://tools.ietf.org/html/rfc7231#section-6.5.3'
        });

exports.unauthorized = () =>
    problemDetailsFactory
        .createProblemDetails({
            status: 401,
            title: 'Unauthorized',
            type: 'https://tools.ietf.org/html/rfc7235#section-3.1'
        });

exports.badRequest = () =>
    problemDetailsFactory
        .createProblemDetails({
            status: 400,
            title: 'Bad Request',
            type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1'
        });
