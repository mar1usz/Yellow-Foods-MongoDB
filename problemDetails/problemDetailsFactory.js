// https://tools.ietf.org/html/rfc7807

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

        // assign extension members
        if (extensions && extensions instanceof Object) {
            for (const [name, value] of Object.entries(extensions)) {
                problemDetails[name] = value;
            }
        }

        // assign properties
        if (type) problemDetails['type'] = type;
        if (title) problemDetails['title'] = title;
        if (status) problemDetails['status'] = status;
        if (detail) problemDetails['detail'] = detail;
        if (instance) problemDetails['instance'] = instance;

        return problemDetails;
    }
};
