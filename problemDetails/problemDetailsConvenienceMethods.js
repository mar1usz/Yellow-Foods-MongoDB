const { problemDetailsFactory } = require("./problemDetailsFactory");

exports.createProblem = ({
  detail = null,
  instance = null,
  status = null,
  title = null,
  type = null,
  extensions = null,
} = {}) =>
  problemDetailsFactory.createProblemDetails({
    detail: detail,
    instance: instance,
    status: status,
    title: title,
    type: type,
    extensions: extensions,
  });

exports.createValidationProblem = ({ errors = null } = {}) =>
  problemDetailsFactory.createProblemDetails({
    status: 400,
    title: "One or more validation errors occurred.",
    type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    extensions: { errors: errors ?? {} },
  });

exports.createNotFound = () =>
  problemDetailsFactory.createProblemDetails({
    status: 404,
    title: "Not Found",
    type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  });
