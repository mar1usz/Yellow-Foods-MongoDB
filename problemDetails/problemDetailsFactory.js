exports.problemDetailsFactory = {
  createProblemDetails({
    detail = null,
    instance = null,
    status = null,
    title = null,
    type = null,
    extensions = null } = {}) {
    // apply defaults
    status ??= 500;
    title ??= 'An error occured while processing your request.';
    type ??= 'https://tools.ietf.org/html/rfc7231#section-6.6.1';

    // create new problem details object
    let problemDetails = {};

    // assign properties
    if (type) problemDetails['type'] = type;
    if (title) problemDetails['title'] = title;
    if (status) problemDetails['status'] = status;
    if (detail) problemDetails['detail'] = detail;
    if (instance) problemDetails['instance'] = instance;

    // assign extension members
    if (extensions && extensions instanceof Object) {
      for (const [key, value] of Object.entries(extensions)) {
        problemDetails[key] = value;
      }
    }

    return problemDetails;
  }
};
