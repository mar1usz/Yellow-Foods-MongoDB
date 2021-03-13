exports.problemDetailsFactory = {
  createProblemDetails({
    detail = null,
    instance = null,
    status = null,
    title = null,
    type = null,
    extensions = null
  } = {}) {
    const problemDetails = {};

    if (type && typeof type === 'string') problemDetails['type'] = type;
    if (title && typeof title === 'string') problemDetails['title'] = title;
    if (status && typeof status === 'number') problemDetails['status'] = status;
    if (detail && typeof detail === 'string') problemDetails['detail'] = detail;
    if (instance && typeof instance === 'string')
      problemDetails['instance'] = instance;

    if (extensions && extensions instanceof Object) {
      for (const [key, value] of Object.entries(extensions)) {
        problemDetails[key] = value;
      }
    }

    // apply defaults
    if ('type' in problemDetails === false)
      problemDetails['type'] =
        'https://tools.ietf.org/html/rfc7231#section-6.6.1';
    if ('title' in problemDetails === false)
      problemDetails['title'] =
        'An error occured while processing your request.';
    if ('status' in problemDetails === false) problemDetails['status'] = 500;

    return problemDetails;
  }
};
